//CRUD
const mongodb = require('mongodb');
//provide function necessary.
const MongoClient = mongodb.MongoClient
const ObjectID =mongodb.ObjectID;

//data base setting.
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName ='task-manager'

//아이디 생성
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

//기존에는 URL은 파싱했던것 같은데 이제는 아래의 두번쨰 인자로 인해,
//그럴필요가 없어졌음. 모든 CRUD는 다음 아래의 connect함수 안에서 진행됨.
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
       return console.log('Unable to connect to dataBase!')
    }
    //데이터 베이스를 만드는 과정.
    const db = client.db(databaseName)
    
    //users라는 컬렉션 안에, 다음 과같은 내역을 넣는다. 두번째로는 콜백함수가 들어감. 
    // db.collection('users').insertOne({
    //     name:'John', 
    //     age:33

    // }, (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     //방금 넣은 document의 array of documents를 나타내는 함수는 ops.
    //     console.log(result.ops)
    // })
    //여러개의 document를 insert하는 것.
    // db.collection('users').insertMany([
    //     {
    //         name:'Jen',
    //         age: 28
    //     }, {
    //         name:'Gunther',
    //         age:27
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description:'cleaning',
    //         completed: true
    //     }, {
    //         description:'washing',
    //         completed: true
    //     }, {
    //         description:'delivering',
    //         completed: false
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })
    //해당 데이터베이스를 찾는 메서드, 이때, 에러는 결과값이 없는게 나오는게아님.
    //만약 해당 결과값이 없으면 그냥 user에는 null이담김.
    // db.collection('users').findOne({name:'Jen'},(error, user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user);
    // })
    // db.collection('users').findOne({_id:new ObjectID('5cd5a6762bc73f452c978120')},(error, user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user);
    // })

    //find함수는 콜백함수가 아닌, cursor를 리턴받는다. 이는 실제데이터가 아닌,
    //데이터가있는 곳을 참조하는 값이다.그렇기에 toArray를 이용해 모든 데이터를 볼 수 있다.
    // db.collection('users').find({age:27}).toArray((error, users)=>{
    //     console.log(users)
    // })

    // db.collection('users').find({age:27}).count((error, users)=>{
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({_id:new ObjectID("5cd57f753331e025a459af1b")},(error, task)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error, tasks)=>{
    //     console.log(tasks)
    // })

    //업데이트 syntax. 업데이트할 대상을 고르고, 업데이트할 내용을 써줌. 이미 update는 
    //promise를 리턴함.(만약 callback함수 안줄시)그리고 그 promise내용은 resolve, reject.
    //가 다 세팅되어있음. 그래서 우리는 then.쪽만 써주면됨. 
    // const updatePromise = db.collection('users').updateOne({
    //     _id:new ObjectID("5cd57ae4e382d03abc4d7203")
    // },{
    //     $set: {
    //         name: "Mike"
    //     }
    // })

    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    //위의 코드를 한번에 써준것.
    // db.collection('users').updateOne({
    //     _id:new ObjectID("5cd57ae4e382d03abc4d7203")
    // },{
    //     $set: {
    //         name: "Mike"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    
    // db.collection('users').deleteMany({
    //     age:27
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    db.collection('tasks').deleteOne({
        description:"washing"
    }).then((result)=>{
        console.log(result)
    }).catch((reject)=>{
        console.log(reject)
    })



})