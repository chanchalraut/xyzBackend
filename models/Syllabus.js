const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
    selectedSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
      },
      selectedClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    });
    module.exports = mongoose.model('Syllabus', syllabusSchema);














































// const syllabusSchema = new mongoose.Schema({
//     selectedSubject: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Subject',
//         required: true
//     },
//     selectedClass:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Class',
//         required: true
//     },
//     selectedcontent: {
//         html: {
//             type: String,
//             required: true
//         }
//     }
// });

// module.exports = mongoose.model('Syllabus', syllabusSchema);



