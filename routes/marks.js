const express = require('express');
const router = express.Router();
const { Student,Subject, Address ,Mark } = require('../models/Schema');

router.get('/', async (req,res) => {

	try{
		const marks = await Mark.find().sort( { _name: 1 } ).populate("student_ref_id").populate("subject_ref_id");
		res.render("marks",{data:marks});
		// res.send(students);
	}catch(err){
		console.log(err);
		res.json({message:err});
	}

});

router.get('/:id', async (req,res) => {

	try{
		const marks = await Mark.findById(req.params.id).sort( { _name: 1 } ).populate("student_ref_id").populate("subject_ref_id");
		// res.send(marks);
		console.log(marks);
		res.render("marks",{data:marks});
	}catch(err){
		res.json({message:err});
	}

});

module.exports = router;
