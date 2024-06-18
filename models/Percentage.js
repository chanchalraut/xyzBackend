// const mongoose = require('mongoose');

// const percentageSchema = new mongoose.Schema({
//   examId: String,
//   studentId: String,
//   classId: String,
//   studentName: String,
//   percentage: Number
// });

// // Create a model based on the schema
// const Percentage = mongoose.model('Percentage', percentageSchema);

// module.exports = Percentage;
const mongoose = require('mongoose');

const percentageSchema = new mongoose.Schema({
  examId: String,
  studentId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for studentId
    ref: 'Addstudents' // Reference to the Student model
  },
  classId: String,
  studentName: String,
  percentage: Number
});

// Create a model based on the schema
const Percentage = mongoose.model('Percentage', percentageSchema);

module.exports = Percentage;
