// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   studentName: {
//     type: String,
//     required: true
//   },
//   studentEmail: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   rollNo: {
//     type: String,
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other'],
//     required: true
//   },
//   classId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Class', 
//     required: true
//   },
//   avatar: {
//     type: String,
//     default: 'default_avatar.png'  
//   }
 
// });

// module.exports=mongoose.model('Addstudents', studentSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  studentName: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  profileImage: {
    type: String, // Path to the profile image
    default: 'default_avatar.png' // Path to a default image
  }
}, { timestamps: true });

// module.exports = mongoose.model('Student', studentSchema);
module.exports=mongoose.model('Addstudents', studentSchema);
