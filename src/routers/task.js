const express = require('express');
const Task =require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');



router.post('/tasks', auth, async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//여기에만 filter를 적용할것. GET/tasks?completed=true/false. 아래 match이용
//이후 pagination을 적용할 것임 limit/skip. GET/tasks?limit=10&skip=0. options이용
//이후 sorting을 할것. GET/tasks?sortBy=createdAt_asc . options 이용
router.get('/tasks',auth, async (req,res)=>{
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true' ? true : false
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]= parts[1] ==='desc'? -1:1;
    }

    try{
        // const tasks = await Task.find({owner:req.user._id})
        // await req.user.populate('tasks').execPopulate();
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
                // {
                //     //오름차순 1, 내림차순 -1
                //     createdAt:-1
                // }
            }
        }).execPopulate();
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req,res)=>{
    const _id= req.params.id
    try{
        // const task = await Task.findById(_id);
        //첫번째인자는 task의 아이디, 두번쨰는 task쓴 유저의 아이디
        const task = await Task.findOne({_id, owner:req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error:"invalid updates"})
    }

    try{
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        // const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()

        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',auth, async(req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports =router