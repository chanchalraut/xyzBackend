const express = require('express');
const router = express.Router();
const Percentage = require('../models/Percentage');
const Classes = require('../models/Class'); 
const Student=require('../models/Student');
const path = require('path');
const fs = require('fs');

router.post('/save', async (req, res) => {
  try {
    // Extract data from the request body
    const data = req.body;

    // Save each data object in the array
    const savedData = await Promise.all(data.map(async (item) => {
      const { examId, studentId, classId, studentName, percentage } = item;

      // Create a new instance of Percentage model
      const newPercentage = new Percentage({
        examId,
        studentId,
        classId,
        studentName,
        percentage
      });

      // Save the data to the database
      return await newPercentage.save();
    }));

    res.status(201).json({ message: 'Percentages saved successfully', data: savedData });
  } catch (error) {
    console.error('Error saving percentages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/classes/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    const classIds = await Percentage.find({ examId }).distinct('classId');
    const classes = await Classes.find({ _id: { $in: classIds } }); // Fetch class details
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Error fetching classes.' });
  }
});












router.get('/:examId/:classId', async (req, res) => {
  const { examId, classId } = req.params;

  try {
    const percentages = await Percentage.find({ examId, classId })
      .populate({
        path: 'studentId',
        select: 'studentName profileImage', // Include the student's name and profile image URL
      })
      .populate('examId', 'name')
      .populate('classId', 'name')
      .sort({ percentage: -1 }) // Sort in descending order based on percentage
      .select('studentName percentage');

    if (!percentages || percentages.length === 0) {
      return res.status(404).json({ message: 'Percentages not found.' });
    }

    for (const result of percentages) {
      if (result.studentId.profileImage) {
       
        const imagePath = path.join(__dirname, '..', '..', 'uploads', 'profileImages', result.studentId.profileImage);

        if (fs.existsSync(imagePath)) {
          res.sendFile(imagePath);
          return;
        } else {
          console.error('Image file not found:', imagePath);
        }
      }
    }

    res.status(200).json(percentages);
  } catch (error) {
    console.error('Error fetching percentages:', error.message);
    res.status(500).json({ message: 'Error fetching percentages.' });
  }
});

module.exports = router;



// router.get('/:examId/:classId', async (req, res) => {
//   const { examId, classId } = req.params;

//   try {
//     const percentages = await Percentage.find({ examId, classId })
//     .populate({
//       path: 'studentId',
//       select: 'studentName profileImage', // Include the student's name and profile image URL
//     })
//       .populate('examId', 'name')
//       .populate('classId', 'name')
//       .sort({ percentage: -1 }) // Sort in descending order based on percentage
//       .select('studentName percentage');

//     if (!percentages || percentages.length === 0) {
//       return res.status(404).json({ message: 'Percentages not found.' });
//     }
    
          

//     res.status(200).json(percentages);
//   } catch (error) {
//     console.error('Error fetching percentages:', error.message);
//     res.status(500).json({ message: 'Error fetching percentages.' });
//   }
// });





// module.exports = router;