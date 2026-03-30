const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
const URL='mongodb://localhost:27017/examprep'
mongoose.connect(URL)
.then(()=>{
    console.log("Successfully Connected")
})
.catch((er)=>{
    console.log(`Error is ${er}`)
    
})
//api started
    app.use('/api/examinee',require('./routes/examineeRoute'))
    app.use('/api/admin',require('./routes/adminRoute'));
    app.use('/api/session/', require('./routes/sessionRoute'));
    app.use('/api/subject/', require('./routes/subjectRoute'));
    app.use('/api/question/', require('./routes/questionRoute'))
    app.use('/api/exams/', require('./routes/examinationRoute'))
    app.use('/api/message', require('./routes/messageRoute'))
    //api ended
app.listen(5000,()=>{
    console.log("Server Connected on http://localhost:5000");
})