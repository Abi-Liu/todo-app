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

app.get('/', (req,res) =>{
    db.collection('todo').find().toArray()
    .then(data => {
        db.collection('todo').countDocuments({completed: false})
        .then(result => {
            res.render("index.ejs", { items: data, incomplete: result});
        })
    })
})

app.post('/add', (req, res) => {
    req.body.completed = false
    db.collection('todo').insertOne(req.body)
    .then(result => {
        console.log('item added')
        res.redirect('/')
    })
})



app.listen(process.env.PORT || PORT, () => console.log(`server running on port ${PORT}`))