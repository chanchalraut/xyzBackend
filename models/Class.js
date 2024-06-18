const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
   },
  capacity: 
  { type: Number, 
    required: true
   },
  description: 
  { type: String,
     required: true },
});

module.exports = mongoose.model('classes', classSchema);