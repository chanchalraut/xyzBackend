const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Classroom = require('../models/Classroom');
const Subject=require("../models/Subject")

router.post('/add-classroom', async (req, res) => {
  try {
    const { selectedClass, selectedSubjects } = req.body;

 
    const existingClassroom = await Classroom.findOne({ 'selectedClass.name': selectedClass.name });

    if (existingClassroom) {
      return res.status(400).json({ message: 'Classroom with the same name already exists' });
    }

    const classroom = new Classroom({
      selectedClass: {
        _id: selectedClass._id,
        name: selectedClass.name 
      }
    });

    for (const subject of selectedSubjects) {
      classroom.selectedSubjects.push({
        _id: subject._id,
        name: subject.name
      });
    }

    await classroom.save();

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'An error occurred while saving data' });
  }
});



router.get('/classes/:classId/subjects', async (req, res) => {
  try {
    const classroom = await Classroom.findOne({ 'selectedClass._id': req.params.classId }).populate('selectedSubjects');
    
    if (!classroom) {
      console.error(`Classroom not found for class ID: ${req.params.classId}`);
      return res.status(404).json({ message: 'Classroom not found' });
    }

    const subjects = classroom.selectedSubjects.map(subject => ({
      _id: subject._id,
      name: subject.name,
    }));

    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'An error occurred while fetching subjects' });
  }
});

module.exports = router;

router.delete('/delete-classroom/:id', async (req, res) => {
  try {
    const classroomId = req.params.id;

    
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

 
    await Classroom.findByIdAndDelete(classroomId);

    res.json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    console.error('Error deleting classroom:', error);
    res.status(500).json({ message: 'An error occurred while deleting classroom' });
  }
});


router.get('/', async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;










