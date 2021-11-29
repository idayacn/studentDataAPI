const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');
const connString = process.env.DB_HOST;

const databaseName = process.env.DB_NAME;
const collectionName = process.env.TB_NAME; 
const { Student,Subject, Address ,Mark } = require('./models/schema')
let studentMarks = [];
var ObjectId = require('mongodb').ObjectID;

process.on("message", (msg) => {
    const {startCount, endCount,studentdata,subjectInfo} = msg;    
    generateData(startCount,endCount,studentdata,subjectInfo);
});

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function init() {
    return new Promise(function(r, e) {
        MongoClient.connect(connString, function(err, db) {
            if (err) e(err)            
            r(db);
        });
    });
}

function generateData(startCount,endCount,studentdata,subjectInfo){


    var semester = ['1st Semester', '2nd Semester'];

    for(let i = startCount; i <= endCount; i++ ){
 
        var stdNo = randomNumber(0,19);
        var sbjNo = randomNumber(0,4);
        var student_id = studentdata[stdNo]._id;
        var subject_id = subjectInfo[sbjNo]._id;
        
        marksInfo = {
            // '_id':ObjectId(),
            'student_ref_id':ObjectId(student_id),
            'subject_ref_id':ObjectId(subject_id),
            'marks':randomNumber(100,999)/10,
            'semester':semester[Math.floor(Math.random()*semester.length)],
            'year':randomNumber(2011,2020), 
            'grade':randomNumber(1,12)
        };  
 
        studentMarks.push({ insertOne : { "document" : marksInfo } });               
    } 
    saveData(studentMarks);
}

function saveData(studentMarks){

    init()
    .then((db) => {

        const studentDb = db.db(databaseName);
        const marks =  studentDb.collection(collectionName);
        
        marks.bulkWrite(studentMarks, function(err, res) {
            if (err) throw err;    
            console.log("Marks Updated!");            
            db.close();
        });     
    })
    .catch((err) => { console.log("error :", err) }); 

}

