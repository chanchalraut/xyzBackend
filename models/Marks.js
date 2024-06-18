const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects',
    required: true,
  },
  studentMarks: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Addstudents',
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
  }],
});



module.exports=mongoose.model('Marks', marksSchema);