const {fork} = require("child_process");
const mongoose = require('mongoose');
const { Student,Subject, Address ,Mark } = require('./models/schema')
require('dotenv/config');
const connString = process.env.DB_HOST;

let counter = 1;
let marksData = [];
let ObjectId = require('mongodb').ObjectID;

mongoose.connect(connString,()=>
    console.log('connected to DB!')
);

function createProcess(data){

    const singleRecord =  fork("./batchData");   
    singleRecord.send(data);
    counter++;  
}

async function getStudents() {

    var students = await Student.find({}, { projection: { _id: 1} });
    var subjects = await Subject.find({}, { projection: { _id: 1} });

    marksData = {
        'students':students,
        'subjects':subjects
    };
    return marksData;
}


getStudents().then(marksData => {

    var studentdata = marksData['students'];
    var subjectInfo = marksData['subjects'];
    
    // console.log(studentdata);
    var records = 1000000;
    const batchCount = 10000;
    const batchData = Math.ceil(records/batchCount);

    let data = {};

    for(let i = 1; i <= batchData; i++) { 

        if((counter-i)==0 || i==1){

            data.startCount = (batchCount * i) + 1;
            data.endCount = batchCount * (i+1) ;
            data.studentdata = studentdata;
            data.subjectInfo = subjectInfo;
  
            createProcess(data);
        }           
    }
});

