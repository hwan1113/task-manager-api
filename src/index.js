const app =  require('./app');
const port = process.env.PORT
//middleware를 위한 코드, route handler에 들어가기전에 실행될 코드
// app.use((req,res,next)=>{
//     console.log(req.method, req.path)
//     if(req.method=='GET'){
//         res.send('GET request are disabled')
//     }else{
//         next()
//     }
//     // 다음 행동을하게 하려면 next필요
//     next()
// })

// app.use((req,res,next)=>{
//         res.status(503).send('Maintenance mode')
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
// //-------------------------------------------------------------
app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})

// // 지금부터 user와 Task의 관계를 빌드할 것임.
// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async()=>{
//     //이건 task를 만들당시 아이디가 나온것. 
//     const task= await Task.findById('5cdbba5cb1bab551cced0919')
//     //위에서 받아서 owner를 통해, owner에 대한 모든 프로파일을 불러올것.
//     //이후 task.owner를 찍으면 owner에 대한 모든 정보나옴.
//     await task.populate('owner').execPopulate()
//     // console.log(task)
//     //이건 task를 만들당시 owner에 userID를 넣은것
//     console.log(task.owner)
//     const user = await User.findById('5cdbba50b1bab551cced0917')
    
//     //여기 user객체에 사실 tasks라는 속성은 없음. 그렇다고 우리가 tokens처럼
//     //tasks를 만들어서 task들을 보관하진 않을 것임. 우리는 virtual property를 이용할것.
//     console.log(user.tasks)
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
//     console.log(token)

//     //token을 verify하는 메서드 2번쨰 인자가 우리가 토큰을 만들때 넣어준
//     //2번째 인자랑 일치해야함.
//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
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