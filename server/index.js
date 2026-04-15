const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// ✅ FINAL CORS (no more errors)
app.use(cors({
  origin: true,        // allow all origins dynamically
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB connection
const URL = process.env.MONGO_URI;

mongoose.connect(URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((er) => console.log(`Error: ${er}`));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Examprep Backend is Running");
});

// ================= API ROUTES =================
app.use('/api/examinee', require('./routes/examineeRoute'));
app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/session', require('./routes/sessionRoute'));
app.use('/api/subject', require('./routes/subjectRoute'));
app.use('/api/question', require('./routes/questionRoute'));
app.use('/api/exams', require('./routes/examinationRoute'));
app.use('/api/message', require('./routes/messageRoute'));
// ============================================

// ✅ PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});