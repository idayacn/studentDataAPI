const express = require('express');
const router = express.Router();
const { Student,Subject, Address ,Mark } = require('../models/Schema')

router.get('/', async (req,res) => {
	// console.log('test');
	console.log(req);
	try{
		const students = await Student.findById(req.params.studentId);
		res.render("students",{data:students});
		// res.send(students);
	}catch(err){
		console.log(err);
		res.json({message:err});
	}

});

// router.get('/:id', async (req,res) => {

// 	try{
// 		const student = await Student.findById(req.params.id);
// 		res.send(student);
// 	}catch(err){
// 		res.json({message:err});
// 	}

// });

// router.get('/:studentId', async (req,res) => {

// 	try{
// 		const student = await Student.findById(req.params.studentId);
// 		res.send(student);
// 	}catch(err){
// 		res.json({message:err});
// 	}

// });

module.exports = router;

