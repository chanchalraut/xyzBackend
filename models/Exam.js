const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  marksObtained: {
    type: Number,
    required: true,
  },
  classIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
  }],
});

module.exports = mongoose.model('Exam', examSchema);

// const mongoose = require("mongoose");

// const examSchema = new mongoose.Schema({
//   exam_name: {
//     type: String,
//     required: true,
//   },
//   description: { type: String, required: true },
//   start_date: {
//     type: Date,
//     required: true,
//   },
//   end_date: {
//     type: Date,
//     required: true,
//   },
  
//   selectedClass:[ {
//     _id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Classes' 
//     },
    
//   },],

// marks_obtain: {
//     type: Number,
//     default: 0,
//   },
// });

// const Exam = mongoose.model("Exam", examSchema);

// module.exports = Exam;




























// const mongoose = require('mongoose');

// 
// const examSchema = new mongoose.Schema({
//     exam_name: {
//         type: String,
//         required: true
//     },
//     start_date: {
//         type: Date,
//         required: true
//     },
//     end_date: {
//         type: Date,
//         required: true
//     },
//     selectedClass: {
//         _id: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Classes'
//         },
//         name: String
//       },
// });

// 
// const Exam = mongoose.model('Exam', examSchema);

// module.exports = Exam;
