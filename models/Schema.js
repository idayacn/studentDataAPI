const mongoose = require('mongoose');

// Student Schema
const studentSchema = mongoose.Schema({
    student_id: {
        type: String,
        required: true
    },
    _name: {
        type: String,
        required: true
    },
    _email: {
        type: String,
        required: true
    },
    _phonenumber: {
        type: String,
        required: true
    },
    _address: {
        type: mongoose.Types.ObjectId,
        ref: 'addresses'
    },
    _marks: {
        type: mongoose.Types.ObjectId,
        ref: 'marks'
    },
    _subject: {
        type: mongoose.Types.ObjectId,
        ref: 'subjects'
    }
});

const Student = mongoose.model('students', studentSchema);

// Subject Schema
const subjectSchema = mongoose.Schema({
    _subject: {
        type: String,
        required: true
    }
});

const Subject = mongoose.model('subjects', subjectSchema);

// Address Schema
const addressSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
});

const Address = mongoose.model('addresses', addressSchema);

// Marks Schema
const marksSchema = mongoose.Schema({
    student_ref_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'students'
    }],
    subject_ref_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'subjects'
    }],
    semester: {
        type: String
    },
    score: {
        type: String
    },
    year: {
        type: String
    },
    grade: {
        type: String
    },
});

const Mark = mongoose.model('marks', marksSchema);

module.exports = { Student,Subject, Address ,Mark}