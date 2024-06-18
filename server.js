// server.js

const express = require('express');
const mongoose = require('mongoose');
require('./config')
const bodyParser = require('body-parser');
const subjectRoutes = require('./routes/subjectRoutes');
const classRoutes=require('./routes/classRoutes')
const classroomRoutes=require('./routes/classrommRoutes')
const syllbusRoutes=require('./routes/syllabusRoutes')
const examRoutes=require('./routes/examRoutes')
const studentRoutes = require('./routes/studentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const marksRoutes=require('./routes/marksRoutes')
const percentageRoutes=require('./routes/percentageRoutes')
const authRoutes = require('./routes/auth');


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads/profileImages',express.static('uploads/profileImages'))
app.use('/api/auth', authRoutes);
// app.use('/api/auth', require('./routes/auth'));
app.use('/api/subjects', subjectRoutes);
app.use('/api/classes',classRoutes)
app.use('/api/classroom',classroomRoutes)
app.use('/api/syllabus',syllbusRoutes)
app.use('/api/exams',examRoutes)

app.use('/api/students', studentRoutes);
app.use('/api/marks', marksRoutes);


app.use('/api/percentage',percentageRoutes)
app.use('/api/event',eventRoutes)

// Start server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});  