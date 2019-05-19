const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');


const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id:userOneId,
    name: 'Mike',
    eamil: 'mike@example.com',
    password: '1234',
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}




beforeEach(async ()=>{
    await User.deleteMany();
    await new User(userOne).save()
    // console.log('beforeEach')
})

// afterEach(()=>{
//     console.log('afterEach')
// })

test('should signup a new user', async()=>{
    const response = await request(app).post('/users').send({
    // await request(app).post('/users').send({
        name:'Andrew',
        email:'fernando111@naver.com',
        password:'1234'
    }).expect(201)

    //Asert that the database was changed correnctly
    const user = await User.findById(response.boddy.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response 너무 양이 많으면 object를 대상으로 상대함.태스트하는건
    //태스트하는 대상의 모든 요소를 갖고 있지 않아됨. 그러나 키:값이 다르면 안됨.
    // expect(response.body.user.name).toBe('Andrew')
    expect(response.body).toMatchObject({
        user:{
            name:'Andrew',
            email:'andrew@naver.com'
        },
        tokens:user.token[0].token
    })

})

test('should login existing user', async()=>{
    await request(app).post('/users/login').send({
        email:userOne.eamil,
        password:userOne.password 
    }).expect(200)
})

test('should not login nonexistent user', async()=>{
    await request(app).post('/users/login').send({
        email:"none",
        password:"none"
    }).expect(400)
})

test('Should get profile for user', async()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should note get profile for unauthenticated user', async()=>{
    await request(app)
        .get('/users/me')
        .expect(401)
})

test('should delete account for user', async()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not delete account for unatuthenticated user', async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})
