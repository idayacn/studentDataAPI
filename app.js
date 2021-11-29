const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');
var bodyParser = require('body-parser')
app.set("view engine", "ejs");

//Import Routes
const studentRoute = require('./routes/student');
const marksRoute = require('./routes/marks');
const filterRoute = require('./routes/filters');


app.use('/students',studentRoute);
app.use('/marks',marksRoute);
app.use('/filterData',filterRoute);


app.get('/',(req,res) => {
	res.render("index");
});

//connect db
mongoose.connect(process.env.DB_HOST,()=>
	console.log('connected to DB!')
);

app.listen(3000);



