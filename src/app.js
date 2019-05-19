const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();

//json파일형식으로 들어오는 request들을 모두 object로 바꿔주는 역할.
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports=app;