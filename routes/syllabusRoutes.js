// routes/syllabusRoutes.js

// 
const express = require('express');
const router = express.Router();
const Syllabus = require('../models/Syllabus');

const Subject = require('../models/Subject'); // Import the Subject model
const ClassData = require('../models/Class'); // Import the ClassData model


// router.post('/', async (req, res) => {
//   try {
//     console.log('Request Body:', req.body);
//     const { selectedClass, selectedSubject, selectedcontent } = req.body;

//     const syllabus = new Syllabus({
//       selectedClass: {
//         _id: selectedClass._id,
//         name: selectedClass.name 
//       },
//       selectedSubject: {
//         _id: selectedSubject._id,
//         name: selectedSubject.name
//       },
//       content: {
//         html: selectedcontent
//       }
//     });

//     await syllabus.save();

//     res.status(201).json({ message: 'Syllabus saved successfully!' });
//   } catch (error) {
//     console.error('Error saving syllabus:', error);
//     res.status(500).json({ message: 'An error occurred while saving syllabus' });
//   }
// });
router.post('/', async (req, res) => {
  try {
    const { selectedSubject, selectedClass, content } = req.body;
    const syllabus = new Syllabus({
      selectedSubject,
      selectedClass,
      content,
    });
    const savedSyllabus = await syllabus.save();
    res.json(savedSyllabus);
  } catch (error) {
    console.error('Error saving syllabus:', error);
    res.status(500).json({ error: 'Error saving syllabus.' });
  }
});
router.get('/', async (req, res) => {
  try {
    const syllabusData = await Syllabus.find();

    
    const populatedSyllabusData = await Promise.all(syllabusData.map(async (template) => {
      const subject = await Subject.findById(template.selectedSubject);
      const classData = await ClassData.findById(template.selectedClass);
      return {
        ...template.toJSON(),
        subjectName: subject ? subject.name : "Unknown Subject",
        className: classData ? classData.name : "Unknown Class",
      };
    }));

    res.json(populatedSyllabusData);
  } catch (error) {
    console.error('Error fetching syllabus data:', error);
    res.status(500).json({ error: 'Error fetching syllabus data. Please try again later.' });
  }
});

// router.get('/', async (req, res) => {
//   try {
    
//     const syllabusData = await Syllabus.find();

   
//     res.json(syllabusData);
//   } catch (error) {
    
//     console.error('Error fetching syllabus data:', error);
//     res.status(500).json({ error: 'Error fetching syllabus data. Please try again later.' });
//   }
// });
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
   
    await Syllabus.findByIdAndDelete(id);
    res.status(200).json({ message: 'Syllabus template deleted successfully' });
  } catch (error) {
    console.error('Error deleting syllabus:', error);
    res.status(500).json({ error: 'Unable to delete syllabus template' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, selectedSubject, selectedClass } = req.body;
    
    await Syllabus.findByIdAndUpdate(id, { content, selectedSubject, selectedClass });
    res.status(200).json({ message: 'Syllabus template updated successfully' });
  } catch (error) {
    console.error('Error updating syllabus:', error);
    res.status(500).json({ error: 'Unable to update syllabus template' });
  }
});


module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Syllabus = require('../models/Syllabus');


// router.post('/', async (req, res) => {
//     try {
//         const { subject, content } = req.body;

        
//         const syllabus = new Syllabus({
//             subject,
//             content: {
//                 html: content
//             }
//         });
//         await syllabus.save();

//         res.status(201).json({ message: 'Syllabus saved successfully!' });
//     } catch (error) {
//         console.error('Error saving syllabus:', error);
//         res.status(500).json({ message: 'An error occurred while saving syllabus' });
//     }
// });

// router.get('/:subjectId', async (req, res) => {
//     try {
//         const { subjectId } = req.params;

        
//         const syllabus = await Syllabus.findOne({ subject: subjectId });

//         if (!syllabus) {
//             return res.status(404).json({ message: 'Syllabus not found for the selected subject' });
//         }

        
//         res.json({ content: syllabus.content.html });
//     } catch (error) {
//         console.error('Error fetching syllabus:', error);
//         res.status(500).json({ message: 'An error occurred while fetching syllabus' });
//     }
// });



module.exports = router;
