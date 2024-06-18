const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    
    
    date: { type: String, required: true },
    starttime: {type:String, require:true},
    endtime: {type:String, require:true},
    description: { type: String },
    
});

module.exports = mongoose.model('Event', eventSchema);

