const mongoose = require('mongoose');
// const validator = require('validator');

//mongoose의 첫번째 인자로 url을 준건데, mongodb쪽에서 한것과 거의 비슷.
//하나의 차이점이라면 맨마지막에 db이름을 직접써준다.이 이름은 mongo에서와는 다른이름.
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    //index를 만들어, 우리가 접근해야할 데이터에 빠르게 접근하도록함.?
    useCreateIndex:true,
    //findbyId and update 함수를 쓰면 useFindModify함수를 자동으로 mongoose가 쓰는데,
    //이럴때 경고창이 떠서 다음 아래와 같은 설정을함.
    useFindAndModify:false
})
//첫번쨰 인자는 모델의 이름, 두번째인자는 우리가 제어하고 싶은 필드명과 설정을함.
// const User = mongoose.model('User', {
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         validate(value){
//             if(value.toLowerCase().includes("password")){
//                 throw new Error("password cannot be used as password")
//         }
//     }},
//     email:{
//         type:String,
//         required:true,
//         //trim, lowercase같은 경우는 sanitization을 하는것. 필요에 맞춰 가공.
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Email is not valid");
//             }
//         }
//     },
//     age:{
//         type:Number,
//         //이제 age에 숫자를 넣으면 그거에 대한 validate을 진행.(required안하면
//         //아래 validate가 실행안됨.)
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// })
//위에서 정의한 모델을 만들고 이를 변수에 담음. 
// const me = new User({
//     name:'      Mike      ',
//     email:'MYEMAIL@GMAIL.com',
//     password: 'fernando11'
// })

//db에 이제 올려주는것. promise를 리턴.
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log("Error!", error)
// })

// const Task =mongoose.model('Task',{
//     description:{
//         type:String,
//         trim:true,
//         required:true
//     },completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const task1 = new Task({
//     description:"wash the dishses"
// });


// task1.save().then(()=>{
//     console.log(task1)
// }).catch((error)=>{
//     console.log(error)
// })
