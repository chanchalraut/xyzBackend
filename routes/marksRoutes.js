const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Marks = require('../models/Marks');
const Addstudents=require('../models/Student');
// const classes =require('../models/Class')
const Classes = require('../models/Class'); 




router.post('/', async (req, res) => {
  const marksArray = req.body;  
  
  console.log('Received request body:', marksArray);

 
  if (!marksArray || !marksArray.length) {
    console.log('Missing or empty marks array:', marksArray);
    return res.status(400).json({ message: 'Marks array is required.' });
  }

  try {
    const savedMarks = await Promise.all(marksArray.map(async ({ examId, classId, subjectId, studentId, marks }) => {
     
      if (!mongoose.Types.ObjectId.isValid(examId) || 
          !mongoose.Types.ObjectId.isValid(classId) || 
          !mongoose.Types.ObjectId.isValid(subjectId)) {
        console.log('Invalid IDs:', examId, classId, subjectId);
        throw new Error('Invalid IDs provided.');
      }

    
      const marksData = {
        studentId,
        marks
      };

      const newMark = new Marks({
        examId,
        classId,
        subjectId,
        studentMarks: [marksData], 
      });

      
      return await newMark.save();
    }));

    console.log('Marks saved:', savedMarks); 

    res.status(201).json({ message: 'Marks saved successfully.', marks: savedMarks });
  } catch (error) {
    console.error('Error saving marks:', error.message); 
    res.status(500).json({ message: error.message });   
  }
});

router.get('/classes/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    const marks = await Marks.find({ examId }); // Assuming your Marks model has an 'examId' field
    const classIds = marks.map(mark => mark.classId);
    const classes = await Classes.find({ _id: { $in: classIds } }); // Assuming your Class model has an '_id' field
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Error fetching classes.' });
  }
});


module.exports = router;

router.get('/:examId/:classId', async (req, res) => {
  const { classId, examId } = req.params;

  console.log('Received classId:', classId); 
  console.log('Received examId:', examId); 
  try {
    const marks = await Marks.find({
      classId,
      examId,
    })
    .populate('examId', 'name')
    .populate('classId', 'name')
    .populate('subjectId', 'name')
    .populate({
      path: 'studentMarks.studentId',
      model:'Addstudents',
      select: 'studentName'
    })
    .exec();


    if (!marks || marks.length === 0) {
      return res.status(404).json({ message: 'Marks not found.' });
    }

    res.status(200).json(marks);
  } catch (error) {
    console.error('Error fetching marks:', error.message); 
    res.status(500).json({ message: 'Error fetching marks.' });
  }
});
router.get('/:examId/:classId', async (req, res) => {
  const { classId, examId } = req.params;

  console.log('Received classId:', classId);
  console.log('Received examId:', examId);

  try {
    const marks = await Marks.aggregate([
      {
        $match: {
          classId: { $eq: classId },
          examId: { $eq: examId }
        }
      },
      {
        $lookup: {
          from: 'addstudents',
          localField: 'studentMarks.studentId',
          foreignField: '_id',
          as: 'studentDetails'
        }
      },
      {
        $unwind: '$studentMarks'
      },
      {
        $lookup: {
          from: 'subjects',
          localField: 'studentMarks.subjectId',
          foreignField: '_id',
          as: 'subjectDetails'
        }
      },
      {
        $group: {
          _id: '$studentDetails',
          marks: { $push: '$studentMarks' },
          subjects: { $addToSet: '$subjectDetails' }
        }
      }
    ]);

    if (!marks || marks.length === 0) {
      return res.status(404).json({ message: 'Marks not found.' });
    }

    res.status(200).json(marks);
  } catch (error) {
    console.error('Error fetching marks:', error.message);
    res.status(500).json({ message: 'Error fetching marks.' });
  }
});

module.exports = router;
// router.get('/mm/:classId/:subjectIds', async (req, res) => {
//   const { classId, subjectIds } = req.params;

//   console.log('Received classId:', classId); 
//   console.log('Received subjectIds:', subjectIds); 

//   try {
//     const marks = await Marks.find({
//       classId,
//       subjectId: { $in: subjectIds.split(',') }
//     })
//     .populate('examId', 'name')
//     .populate('classId', 'name')
//     .populate('subjectId', 'name')
//     .populate({
//       path: 'studentMarks.studentId',
//       model:'Addstudents',
//       select: 'studentName'
//     })
//     .exec();


//     if (!marks || marks.length === 0) {
//       return res.status(404).json({ message: 'Marks not found.' });
//     }

//     res.status(200).json(marks);
//   } catch (error) {
//     console.error('Error fetching marks:', error.message); 
//     res.status(500).json({ message: 'Error fetching marks.' });
//   }
// });


module.exports = router;
