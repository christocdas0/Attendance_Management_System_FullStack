const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();


// Routes initializing 
const studentRoute = require('./routes/students');
const teacherRoute = require('./routes/teachers');
const adminRoute = require('./routes/admin');
const classRoute = require('./routes/classes');
const attendanceRoute = require('./routes/attendance');





app.use(express.json());
// Enable CORS for all routes
app.use(cors());

app.use("/api/students", studentRoute);
app.use("/api/teachers", teacherRoute);
app.use("/api/admin", adminRoute);
app.use("/api/class", classRoute);
app.use("/api/attendance", attendanceRoute);

// Database connection
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch((err) => {
    console.error('Error occurred while connecting to MongoDB:', err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server Start Running on PORT ${PORT}...`);
})