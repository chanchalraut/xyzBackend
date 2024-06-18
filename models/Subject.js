// models/Subject.js

const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
   },
  type: 
  { type: String, 
    required: true
   },
  subjectCode:
   { type: String,
    required: true
  },
  description: 
  
  { type: String,
     required: true },
});

module.exports = mongoose.model('subjects', subjectSchema);