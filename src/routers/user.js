const express = require('express');
const User = require('../models/user')
const router = new express.Router();
const auth=require('../middleware/auth')
const multer = require('multer');
const sharp = require('sharp');
const {sendWelcomeEmail,sendFarewellEmail} = require('../emails/account');

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        // await user.save()
        //sendWelcomeEmail은 await이지만, 지금은 굳이 여기서 돌아오는 값을 쓸필요가없어서 await을 안씀.
        const token = await user.generateAuthToken();
        sendWelcomeEmail(user.email, user.name)
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        //getPublicProfile이란걸 만듬.이건 model에서. 방법1
        // res.send({user: user.getPublicProfile(), token})
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

//여러기기에서 로그인 했을시,하나의 기기에서 로그아웃하더라도 남은 기기에서는 
//살아있어야함. 그렇기에 로그인했을 때 사용한 특정한 토큰을 타겟할것임.
router.post('/users/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//그러나 모든 기기에서 로그아웃하게 할 수 도있음.
router.post('/users/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res)=>{
    res.send(req.user)
})

router.patch('/users/me',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid updates"})
    }
    try{
        // const user = await User.findById(req.params.id)
        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        await req.user.save()

        //아래의 findByIdANdUpdate는 save에 대한 middle웨어를 mongoose가 적용시키지 않음.
        //그래서 아래의 코드를 위의 코드로 바꿔줄 것임. 2단계로 나눠준다고보면됨.
        //첫번쨰인자는 아이디, 두번쨰 인자는 내용,
        //세번쨰는 option. new:true 업데이트시, 그 업데이트 결과로써 업데이트된 값이나옴(false면 업데이트되기전 값이 나옴)
        //runvalidator는 업데이트 되는 doc에 대해 validate을 함.
        // const user = await User.findByIdAndUpdate(req.params.id, req.body,{
        //     new:true,
        //     runValidators:true
        // })
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/me',auth, async (req,res)=>{
    try{
        await req.user.remove()
        sendFarewellEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

const avatar = multer({
    // dest:'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('must return an image file'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


router.delete('/users/me/avatar', auth, async(req, res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user||!user.avatar){
            //여기서 에러에 걸리면 바로 아래 catch절로감.
            throw new Error();
        }
        //어떤 파일을 돌려받는지 얘기해줘야함.
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)

    }catch(e){
        res.satus(404).send()
    }
})


module.exports = router