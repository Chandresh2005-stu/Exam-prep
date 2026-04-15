const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes("vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());

// ✅ Use Atlas connection from .env
const URL = process.env.MONGO_URI;

mongoose.connect(URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((er) => {
    console.log(`Error: ${er}`);
  });

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

// ✅ Use dynamic port (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});