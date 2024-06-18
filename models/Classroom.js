// models/classroom.js
const mongoose = require('mongoose');
const Classes=require('../models/Class')
const Subject = require("../models/Subject");


const classroomSchema = new mongoose.Schema({
  selectedClass: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classes' 
    },
    name: String 
  },
   
  selectedSubjects:  [{
    _id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects' 
    },
    name: { 
      type: String, 
      
     },
   }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;

