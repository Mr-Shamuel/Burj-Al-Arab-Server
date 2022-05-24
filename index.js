const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');


const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
require('dotenv').config()

const port = 4000;

// const pass = SpZauq1U00KBiZ0E;


app.get('/',(req,res) => {
    res.send("server is connected successfully");
})


console.log("my dbuser pass name:",process.env.DB_USER_Pass);

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_pass}@cluster0.9v7jf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const bookingcollection = client.db("burj-al-Arab").collection("Clients");
  
  console.log("database is successfully connected");


  app.post('/addbooking',(req,res) => {
      const newbooking = req.body;

    bookingcollection.insertOne(req.body)
    .then(result => {
        res.send(result.insertedCount> 0);
    })

console.log(newbooking);
})


app.get('/bookings',(req,res)=>{
    // console.log(req.query.email);
    bookingcollection.find({email:req.query.email})
    .toArray((err,document)=>{
        res.send(document);
    })
   
})



});





app.listen(port)