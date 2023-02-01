const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client =>{
        console.log(`connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', async (req,res) =>{
    const items = await db.collection('todo').find().toArray()
    const incomplete = await db.collection('todo').countDocuments({completed: false})
    res.render('index.ejs', {items: items, incomplete: incomplete})

//     db.collection('todo').find().toArray()
//     .then(data => {
//         db.collection('todo').countDocuments({completed: false})
//         .then(result => {
//             res.render("index.ejs", { items: data, incomplete: result});
//         })
//     })
})

app.post('/add', async(req, res) => {
    req.body.completed = false
    const insert = await db.collection('todo').insertOne(req.body)
    console.log('item added')
    res.redirect('/')
    
    // db.collection('todo').insertOne(req.body)
    // .then(result => {
    //     console.log('item added')
    //     res.redirect('/')
    // })
})

app.put('/markCompleted', async (req,res) =>{
    let completed = await db.collection('todo').updateOne(req.body, {
        $set: {
            completed: true
        }
    })
    console.log('marked complete')
    res.json('marked completed')
})

app.put("/markUncompleted", async (req, res) => {
  let completed = await db.collection("todo").updateOne(req.body, {
    $set: {
      completed: false,
    },
  });
  console.log("marked uncomplete");
  res.json("marked uncompleted");
});


app.delete('/delete', async (req, res) => {
    const deleteItem = await db.collection('todo').deleteOne(req.body)
    console.log('item deleted')
    res.json('item deleted')
})


app.listen(process.env.PORT || PORT, () => console.log(`server running on port ${PORT}`))