const { text } = require('express');
const express = require('express')
const app = express();
var bodyParser = require('body-parser')

// mongoose contact page connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({
    extended: true
  }));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected...")
});

// Defining Schema
const contactSchema = new mongoose.Schema({
    name: String,
    Age : Number,
    email: String, 
    Adress: String, 
    Problem: String 
  });
const Contanct = mongoose.model('Contact', contactSchema);


app.use('/static',express.static('static'))

app.set('view engine','pug')
app.set('views','./views')

app.get('/',(req,res)=>{
    const params = {"title":"Dance Academy","content":"The Best Dance Academy In the world"}
    res.status(200).render('Home.pug',params)
})

app.get('/contact',(req,res)=>{
    const params = {"title":"Dance Academy","content":"The Best Dance Academy In the world"}
    res.status(200).render('Contact.pug',params)
})

app.post('/contact',(req,res)=>{
    
    var myData = new Contanct(req.body)
    myData.save().then(()=>{
        res.send("This item is saved in Database")
    }).catch(()=>{
        res.status(400).send("NOt Saved")
    })
})
app.listen(80,()=>
{
    console.log("Server is running")
})