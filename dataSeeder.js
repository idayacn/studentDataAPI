const mongoose = require('mongoose')
const faker = require('faker');
// const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');
const connString = process.env.DB_HOST;
const { Student,Subject, Address ,Mark } = require('./models/schema')

mongoose.connect(connString, {
    useNewUrlParser: true,
});

// Feed Student Data
async function studentData(){
    for (let i = 1; i <= 20; i++) {
        const student = new Student({
            student_id:i,
            _name: faker.name.findName(),
            _email: faker.internet.email(),
            _phonenumber: faker.phone.phoneNumber(),
        })

        student.save()
        .then(studentRef => {
            const address = new Address({            
                city: faker.address.city(),
                country: faker.address.country()
            })

            address.save()
            .then(addressRef => {
                studentRef._address = addressRef._id
                studentRef.save().then(_ => _)
            })
        })
    }
}

async function subjectInfo(){
    var subjects = ['Biology','Chemistry','Biotechnology','Maths','Physics'];

    // Feed Subjects 
    for (let i = 0; i < subjects.length; i++) {
        
        const subject = new Subject({
            _subject:subjects[i]       
        })

        subject.save()
    }
}

studentData().then(students => {

    console.log('Student records created !');
    subjectInfo().then(subjects =>{
        console.log('Subject  records  created !');
    })

});
