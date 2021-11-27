const MongoClient = require('mongodb').MongoClient;

require('dotenv/config');
const connString = process.env.DB_HOST;
const databaseName = process.env.DB_NAME;
const collectionName = process.env.TB_NAME; 

process.on("message", (msg) => {
    const {startCount, endCount} = msg;
    // console.log(startCount +" - "+ endCount);
    inputStudents(startCount, endCount);
});

function init() {
    return new Promise(function(r, e) {
        MongoClient.connect(connString, function(err, db) {
            if (err) e(err)            
            r(db);
        });
    });
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function inputStudents(startCount, endCount) { 
	
	let studentData = [];

    for(let i = startCount; i <= endCount; i++ ){ 

        var semester = ['1st Semester', '2nd Semester'];
        var subjects = ['Biology','Chemistry','Biotechnology','Maths','Physics'];       
        let marks = [];
        let subjectInfo = [];
        let subjectSecondsem = [];
        // var sid = studentid[Math.floor(Math.random()*studentid.length)];

        for(k = 0; k < 5; k++){
        	subjectInfo.push({'name':subjects[k] ,'Marks':randomNumber(100,1000)/10});
        }

        for (j = 0; j < 2; j++) {
            marks.push({'Semester':semester[j],'Subjects':subjectInfo});
        }

        studentMarks = {'Student id':randomNumber(1,20), 'Marks Info':marks, 'Class':randomNumber(1,12), 'Year':randomNumber(2011,2020)};

        studentData.push({ insertOne : { "document" : studentMarks } });
    }
    init()
        .then((db) => {
            const studentDb = db.db(databaseName);
            const student =  studentDb.collection(collectionName)  
            
            student.bulkWrite(studentData, function(err, res) {
                if (err) throw err;                
                db.close();
            });     
        })
        .catch((err) => { console.log("error :", err) });         
}
