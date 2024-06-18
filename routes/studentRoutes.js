// const express = require('express');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');


// const Student = require('../models/Student');



// const validate = [
//   body('studentName').notEmpty().withMessage('Student name is required'),
//   body('studentEmail').isEmail().withMessage('Invalid email address'),
//   body('rollNo').notEmpty().withMessage('Roll number is required'),
//   body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
//   body('classId').notEmpty().withMessage('Class ID is required')
// ];


// router.post('/',  validate, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

    
//     const { studentName, studentEmail, rollNo, gender, classId } = req.body;
    
//     const student = new Student({
//       studentName,
//       studentEmail,
//       rollNo,
//       gender,
//       classId,
      
//     });
//     await student.save();
//     res.status(201).json(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Student = require('../models/Student');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profileImages'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const validate = [
  body('studentName').notEmpty().withMessage('Student name is required'),
  body('studentEmail').isEmail().withMessage('Invalid email address'),
  body('rollNo').notEmpty().withMessage('Roll number is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('classId').notEmpty().withMessage('Class ID is required')
];

router.post('/', upload.single('profileImage'), validate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { studentName, studentEmail, rollNo, gender, classId } = req.body;
    const profileImage = req.file ? req.file.path : 'default_avatar.png'; // Use the uploaded file or default

    const student = new Student({
      studentName,
      studentEmail,
      rollNo,
      gender,
      classId,
      profileImage
    });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//  router.get('/:classId', async (req, res) => {
//     try {
//       const { classId } = req.params;
//       const students = await Student.find({ classId });
//       if (students.length === 0) {
//         return res.status(404).json({ message: 'No students found for this class' });
//       }
//       res.status(200).json(students);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
// router.post('/', upload.single('profileImage'), validate, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { studentName, studentEmail, rollNo, gender, classId } = req.body;
//     let profileImage = req.file ? req.file.path : 'default_avatar.png'; // Use the uploaded file or default

//     // Replace backslashes with forward slashes in profileImage path
//     profileImage = profileImage.replace(/\\/g, '/');

//     const student = new Student({
//       studentName,
//       studentEmail,
//       rollNo,
//       gender,
//       classId,
//       profileImage
//     });

//     await student.save();
//     res.status(201).json(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


// GET API to fetch students by classId
// router.get('/:classId', async (req, res) => {
//   try {
//     const { classId } = req.params;
//     const students = await Student.find({ classId });
//     if (students.length === 0) {
//       return res.status(404).json({ message: 'No students found for this class' });
//     }
//     res.status(200).json(students);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

const fs = require('fs');
const mime = require('mime');

router.get('/:classId', async (req, res) => {
  try {
    const { classId } = req.params;

    // Check if the request is for an image
    if (req.query.image) {
      const imageName = req.query.image; // assuming the image name is provided as a query parameter
      const imagePath = path.join(__dirname, 'uploads/profileImages', imageName);
      
      // Set the appropriate Content-Type header based on the image file extension
      const contentType = mime.getType(imagePath);
      if (!contentType || !contentType.startsWith('image/')) {
        return res.status(500).send('Invalid image file');
      }
      res.setHeader('Content-Type', contentType);

      // Read the image file and send it in the response
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          console.error('Error reading image file:', err);
          return res.status(500).send('Internal Server Error');
        }
        res.send(data);
      });
    } else {
      // Continue with the existing logic to fetch student data
      const students = await Student.find({ classId }).populate('profileImage');
      
      if (students.length === 0) {
        return res.status(404).json({ message: 'No students found for this class' });
      }
      
      res.status(200).json(students);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;




  
router.get('/', async (req, res) => {
  try {
    const { classId, subjectId } = req.query;

    let query = {};

    
    if (classId) {
      query.classId = classId;
    }

   
    if (subjectId) {
      query.subjectId = subjectId;
    }

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

 
  
  
 