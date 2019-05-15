

const express = require('express');
require('./db/mongoose');
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT

//middleware를 위한 코드, route handler에 들어가기전에 실행될 코드
// app.use((req,res,next)=>{
//     // console.log(req.method, req.path)
//     if(req.method=='GET'){
//         res.send('GET request are disabled')
//     }else{
//         next()
//     }

//     //다음 행동을하게 하려면 next필요
//     // next()
// })

// app.use((req,res,next)=>{
//         res.status(503).send('Maintenance mode')
    
// })










//json파일형식으로 들어오는 request들을 모두 object로 바꿔주는 역할.
app.use(express.json())
// //이제 새로운 router를 만들어 아래있는 CRUD들을 관리할 것임.
// const router = new express.Router()
// //router를 이제 다음과 같은 식으로 만듬.
// router.get('/test', (req,res)=>{
//     res.send('This is from my other router')
// })
// //router를 등록해줌(express를 이용)
// app.use(router)
app.use(userRouter)
app.use(taskRouter)




//전에는 get이었는데, 이제는 post요청을 하기에 아래에 post로 써줌.
//원래 asnyc를 하면 리턴은 무조건 promise객체임 그러나 아래를 보면, 우리는
//어차피 return문이 없었음. 그렇기에 함수 자체에 특별히 바꿀게 없음.
// app.post('/users',async (req,res)=>{
//     // console.log(req.body)
//     const user = new User(req.body)
    
//     try{
//         await user.save()
//         res.status(201).send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }

//     // user.save().then(()=>{
//     //     res.status(201).send(user)
//     // }).catch((e)=>{
//     //     res.status(400).send(e)
//     //     // res.send(e)
//     // })
// })

// app.get('/users', async (req, res)=>{

//     try{
//         const users = await User.find({})
//         res.send(users)
//     }catch(e){
//         res.status(500).send()
//     }
//     // User.find({}).then((users)=>{
//     //     res.send(users)
//     // }).catch((e)=>{
//     //     res.status(500).send(e)
//     // })
// })

// app.get('/users/:id', async (req,res)=>{
//     const _id= req.params.id
//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
//     // console.log(req.params)
//     // //여기서 받는건 StringID인데 mongooseDB는 이를
//     // const _id= req.params.id
//     // //ObjectID로 알아서 변환해줌.
//     // User.findById({_id}).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e)=>{
//     //     res.status(500).send()
//     // })
// })

// //update문
// app.patch('/users/:id', async(req,res)=>{
//     //req.body를 배열로 만들어줌. 
//     const updates = Object.keys(req.body)
//     //다음 아래에 언급하지 않은 걸 업데이트 못하게함.
//     const allowedUpdates = ['name','email','password','age']
//     //update의 모든 요소는 allowedUpdates안에 들어가야함.
//     //every는 updates의 요소하나하나에 접근해서, allowedUpdates에 포함
//     //되었는지를 따진다. 만약 하나라도 false이면 false가 리턴됨. 
//     const isValidOperation = updates.every((update)=>{
//         return allowedUpdates.includes(update)
//     })

//     if(!isValidOperation){
//         return res.status(400).send({error:"Invalid updates"})
//     }

//     try{
//         //첫번쨰인자는 아이디, 두번쨰 인자는 내용,
//         //세번쨰는 option. new:true 업데이트시, 그 업데이트 결과로써 업데이트된 값이나옴(false면 업데이트되기전 값이 나옴)
//         //runvalidator는 업데이트 되는 doc에 대해 validate을 함.
//         const user = await User.findByIdAndUpdate(req.params.id, req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// app.delete('/users/:id', async (req,res)=>{
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send()
//         }

//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
// })

// app.post('/tasks', async (req,res)=>{
//     const task = new Task(req.body)
//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }

//     // task.save().then(()=>{
//     //     res.status(201).send(task)
//     // }).catch((e)=>{
//     //     res.status(400).send(e)
//     // })
// })

// app.get('/tasks', async (req,res)=>{
//     try{
//         const tasks = await Task.find({})
//         res.send(tasks)
//     }catch(e){
//         res.status(500).send()
//     }

//     // Task.find({}).then((tasks)=>{
//     //     res.send(tasks)
//     // }).catch((e)=>{
//     //     res.status(500).send()
//     // })
// })

// app.get('/tasks/:id', async (req,res)=>{
//     const _id= req.params.id
//     try{
//         const task = await Task.findById(_id);
//         if(!task){
//             return res.status(404).send();
//         }
//         res.send(task)
//     }catch(e){
//         res.status(500).send()
//     }

//     // Task.find({_id}).then((task)=>{
//     //     if(!task){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(task)
//     // }).catch((e)=>{
//     //     res.status(500).send()
//     // })
// })

// app.patch('/tasks/:id', async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description','completed']
//     const isValidOperation = updates.every((update)=>{
//         return allowedUpdates.includes(update)
//     })
//     if(!isValidOperation){
//         return res.status(400).send({error:"invalid updates"})
//     }

//     try{
//         const task = await Task.findByIdAndUpdate(req.params.id,
//             req.body,{new:false,runValidators:true})
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// app.delete('/users/:id', async(req,res)=>{
//     try{
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
// })

//------------------------------파일 업로드-------------------
// const multer = require('multer');
// const upload = multer({
//     //옵션사항을 다 적어줌
//     dest:'images',
//     limits:{
//         fileSize: 100000
//     },
//     //모든 정보는 file에 들어있음.
//     fileFilter(req,file, cb){
        
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('please upload a word document'))
//         }
//         cb(undefined, true)
        
//         // cb(undefined, false)
//     }    
// })
// //single안의 인자는 그냥 upload의 이름.
// // const errorMiddleware = (req, res, next)=>{
// //     throw new Error('From my middleware')
// // }
// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.send()
//     //에러가 낫을시.
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })







//-------------------------------------------------------------
app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})

//지금부터 user와 Task의 관계를 빌드할 것임.
// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async()=>{
//     // //이건 task를 만들당시 아이디가 나온것. 
//     // const task= await Task.findById('5cda66e38dded34164b23c22')
//     // //위에서 받아서 owner를 통해, owner에 대한 모든 프로파일을 불러올것.
//     // //이후 task.owner를 찍으면 owner에 대한 모든 정보나옴.
//     // await task.populate('owner').execPopulate()
//     // console.log(task)
//     // //이건 task를 만들당시 owner에 userID를 넣은것
//     // console.log(task.owner)
//     const user = await User.findById('5cda66187fe38105943e890f')
    
//     //여기 user객체에 사실 tasks라는 속성은 없음. 그렇다고 우리가 tokens처럼
//     //tasks를 만들어서 task들을 보관하진 않을 것임. 우리는 virtual property를 이용할것.
//     // console.log(user.tasks)
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks)

// }
// main();





























////////////////////////////////////////////////////////////////////예시
// const bcrypt = require('bcryptjs')

// const myFunction = async()=>{
//     const password = 'Red12345'
//     //두번째 인자는 algorithm이 몇번돌지.
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword);

//     //비밀번호 비교
//     const isMatch = await bcrypt.compare('Red12345', hashedPassword)
//     // console.log(isMatch)
// }
// myFunction()

// const jwt = require('jsonwebtoken')

// const myFunction= async ()=>{
//     //리턴값은 token이고 client쪽에 줄것임.
//     //첫번째 인자로는 토큰에 넣어줄 정보를 쓸껀데, 우리의 경우, 그냥,
//     //인증에 쓸, identifier만 필요함.두번쨰는 sign이라는 건데, 토큰이 바뀌거나,
//     //변형되지 않음을 알려줌 secret.3번쨰 인자는 설정 요소들이 들어감.
//     const token = jwt.sign({_id:"abc123"}, 'thisismynewcourse',{expiresIn:'7 days'})
//     // console.log(token)

//     //token을 verify하는 메서드 2번쨰 인자가 우리가 토큰을 만들때 넣어준
//     //2번째 인자랑 일치해야함.
//     const data = jwt.verify(token, 'thisismynewcourse')
//     // console.log(data)
// }
// myFunction();


// const pet = {
//     name:'Hal'
// }

// pet.toJSON = function(){
//     console.log(this)
//     return this  
// }
// console.log(JSON.stringify(pet))