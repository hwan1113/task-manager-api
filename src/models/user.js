const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken');
const Task = require('./task');

//원래 Schema 안에 잇는 객체는 모델의 2번쨰 인자였으나(moongse.js참조), 이걸 Schema에 넣고
//이 스키마를 모델의 2번째 인자로 넣어준다.
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("password cannot be used as password")
        }
    }},
    email:{
        type:String,
        required:true,
        trim:true,
        //unique는 save()메서드 실행시 확인이 되는듯.
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens:[{
        //tokens, age같은 속성명들은 이미 객체안에 들어있는데, tokens:[{ 와 같이 또다른
        //객체가 있으면, 그 객체안에 id를 만들어준다. 즉 token속성과 동일레벨로 _id가 만들어짐.  
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},
//이 아래부터는 schema의 세번째 인자인데, 이는 옵션을 주관함.
{
    timestamps:true
})

//db에 없음. 그냥 mongoose가 서로의 관계를 확인하기 위해 만든것. 
userSchema.virtual('tasks', {
    ref: 'Task',
    localField:'_id', //여기에서의 값
    foreignField:'owner' //Task에서의 owner값
})

userSchema.statics.findByCredentials =async(email, password)=>{
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error("Unable to Login")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Wrong Password")
    }
    return user
}
//위의 statics는 model에서 접근가능하며 이는 Model methods라고 하고, 
//아래의 methods는 instance에서 접근가능함. 
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens= user.tokens.concat({token: token})
    await user.save()
    return token
}

// userSchema.methods.getPublicProfile = function(){
//     const user = this
//     const userObject = user.toObject()
//     delete userObject.password;
//     delete userObject.tokens
//     return userObject
// }

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password;
    delete userObject.tokens
    delete userObject.avatar
    
    return userObject
}



//이제 미들웨어를 정의해줌. hash the plain text password before saving/
userSchema.pre('save', async function(next){
    //this는 특정 document(user)를 가르킴
    //save를 하게되면 save를 하는 모델객체(document)에 대해 this가 가르킬것임.
    const user = this
    console.log('just before saving')
    //이미  hashed가 됬는지를 확인하기 위함. 
    //save가 들어가는 곳은, 유저생성시, 유저 로그인확인시, 유저 수정시 이다.
    //유저생성시는 당연히 modified안됫음. 유저로그인 확인시 토큰 넣어주는데, 이때 생성시 modified되서 건너뜀.
    //유저 수정시, save하기전 모든 새로운 요소들은 다 들어갔다. 이때 새로운 패스워드도 넣었다면, 이 새로운 패스워드는
    //modified된게아님. 그래서 modify해줌. 이때 패스워드를 안넣었다면 modified된 패스워드를 비교해서 다시 hash안함.
    if(user.isModified('password'))
        user.password= await bcrypt.hash(user.password, 8)
    //async함수가 끝난걸 알기 위해 next()를 써줌.
    next()
})

//Delete user tasks when user is removed
userSchema.pre('remove',async function(next){
    const user = this    
    await Task.deleteMany({owner:user._id})
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User