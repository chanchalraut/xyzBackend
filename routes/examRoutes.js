const express = require('express');
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');
const { DateTime } = require('luxon');
const router = express.Router();
const Exam = require('../models/Exam');

router.post('/', async (req, res) => {
    const { name, duration,description, startDate, endDate, marksObtained, classIds } = req.body;
  
    
    if (!name || !duration || !description|| !startDate || !endDate || !marksObtained || !classIds.length) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    if (duration <= 0 || marksObtained <= 0 || startDate >= endDate) {
      return res.status(400).json({ message: 'Invalid data provided.' });
    }
  
    try {
      const exam = new Exam({
        name,
        duration,
        description,
        startDate,
        endDate,
        marksObtained,
        classIds,
      });
  
      await exam.save();
      res.status(201).json(exam);
    } catch (error) {
      res.status(500).json({ message: 'Error adding exam.', error: error.message });
    }
  });
  router.get('/', async (req, res) => {
    try {
     
      const exams = await Exam.find();
      
      
      if (!exams || exams.length === 0) {
        return res.status(404).json({ message: 'No exams found.' });
      }
  
      
      res.status(200).json(exams);
    } catch (error) {
    
      res.status(500).json({ message: 'Error fetching exams.', error: error.message });
    }
  });

router.get('/:examId/details', async (req, res) => {
  const examId = req.params.examId;

  try {
    const exam = await Exam.findById(examId);
    
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found.' });
    }

    const { startDate, endDate, marksObtained } = exam;
    
    res.status(200).json({ startDate, endDate, marksObtained });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam details.', error: error.message });
  }
});

  router.get('/:examId/:classId/marksObtained', async (req, res) => {
    const { examId, classId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(examId) || !mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: 'Invalid Exam or Class ID' });
    }
  
    try {
     
      const marks = await Marks.find({ examId, classId });
      
      res.status(200).json(marksObtained);
    } catch (error) {
      console.error('Error fetching marks:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.get('/:examId/subjects/:subjectId', async (req, res) => {
    const { examId, subjectId } = req.params;
  
    try {
      const exam = await Exam.findById(examId);
      
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
  
      const subject = exam.subjects.find((s) => s._id.toString() === subjectId);
  
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found for the exam' });
      }
  
      res.status(200).json({
        examDate: subject.examDate,
        marks: subject.marks,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching subject details', error: error.message });
    }
  });
  


router.get('/:examId/classes', async (req, res) => {
  const { examId } = req.params;

  
  if (!mongoose.Types.ObjectId.isValid(examId)) {
    return res.status(400).json({ message: 'Invalid Exam ID' });
  }

  try {
    const exam = await Exam.findById(examId).populate('classIds');
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    const classes = exam.classIds;
    res.json(classes);
  } catch (error) {
    console.error('Error fetching assigned classes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
  

