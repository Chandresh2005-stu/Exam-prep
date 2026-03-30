const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Examination = require('../models/Examination');
const mongoose = require('mongoose');
const Examinee = require('../models/Examinee');
const ExamAttempted = require('../models/ExamAttempted');

// ------------------ CREATE EXAM ------------------
router.post('/', async (req, res) => {
  try {
    const {
      examName,
      date,
      time,
      duration,
      totalMarks,
      passingMarks,
      sessionId,
      status,
      questionDistribution
    } = req.body;

    if (!examName || !date || !time || !duration || !totalMarks || !passingMarks || !sessionId || !questionDistribution) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: `Invalid session ID: ${sessionId}` });
    }

    const selectedQuestions = [];

    for (const dist of questionDistribution) {
      const { subject, numberOfQuestions } = dist;
      const questionCount = parseInt(numberOfQuestions);

      if (!mongoose.Types.ObjectId.isValid(subject)) {
        return res.status(400).json({ error: `Invalid subject ID: ${subject}` });
      }

      if (isNaN(questionCount) || questionCount <= 0) {
        return res.status(400).json({ error: `Invalid number of questions for subject: ${subject}` });
      }

      const questions = await Question.aggregate([
        { $match: { subject: new mongoose.Types.ObjectId(subject) } },
        { $sample: { size: questionCount } }
      ]);

      if (questions.length < questionCount) {
        return res.status(400).json({ error: `Not enough questions available for subject: ${subject}` });
      }

      selectedQuestions.push(...questions.map(q => q._id));
    }

    const newExam = new Examination({
      title: examName,
      date,
      time,
      duration,
      totalMarks,
      passingMarks,
      sessionId,
      status: status || 'Scheduled',
      questionDistribution: questionDistribution.map(d => ({
        subject: d.subject,
        questionCount: parseInt(d.numberOfQuestions)
      })),
      questions: selectedQuestions
    });

    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (err) {
    console.error('Error creating exam:', err);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// ------------------ FETCH ALL EXAMS ------------------
router.get('/exams', async (req, res) => {
  try {
    const exams = await Examination.find({}, 'title date time status totalMarks passingMarks duration')
      .populate('sessionId', 'name')
      .populate('questionDistribution.subject', 'name');
    res.json(exams);
  } catch (err) {
    console.error('Error fetching exams:', err);
    res.status(500).json({ error: 'Error fetching exams' });
  }
});

// ------------------ UPDATE EXAM ------------------
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid exam ID: ${id}` });
    }

    const updatedExam = await Examination.findByIdAndUpdate(id, req.body, { new: true })
      .populate('sessionId', 'name')
      .populate('questionDistribution.subject', 'name');

    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json(updatedExam);
  } catch (err) {
    console.error('Error updating exam:', err);
    res.status(400).json({ error: 'Error updating exam' });
  }
});

// ------------------ DELETE EXAM ------------------
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid exam ID: ${id}` });
    }

    const deletedExam = await Examination.findByIdAndDelete(id);
    if (!deletedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    console.error('Error deleting exam:', err);
    res.status(500).json({ error: 'Error deleting exam' });
  }
});

// ------------------ FETCH QUESTIONS FOR AN EXAM ------------------
router.get('/exam/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ error: `Invalid exam ID: ${examId}` });
    }

    const exam = await Examination.findById(examId)
      .populate('questionDistribution.subject', 'name')
      .populate('questions');

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    return res.json({
      exam: {
        title: exam.title,
        date: exam.date,
        time: exam.time,
        duration: exam.duration,
        totalMarks: exam.totalMarks,
        passingMarks: exam.passingMarks,
        status: exam.status
      },
      questions: exam.questions
    });
  } catch (err) {
    console.error('Error fetching exam questions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ------------------ SUBMIT EXAM ------------------
router.post('/submit-exam', async (req, res) => {
  try {
    const { examId, answers, email } = req.body;
    const user = await Examinee.findOne({ email: email });
    if (!user) return res.status(404).json({ error: 'Examinee not found' });

    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ error: `Invalid exam ID: ${examId}` });
    }

    const exam = await Examination.findById(examId).populate('questions');
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    let score = 0;
    const totalMarks = parseInt(exam.totalMarks);
    const marksPerQuestion = totalMarks / exam.questions.length;

    exam.questions.forEach((question) => {
      const submittedAnswer = answers[question._id];
      if (submittedAnswer === question.correctAnswer) {
        score += marksPerQuestion;
      }
    });

    const passed = score >= parseInt(exam.passingMarks);

    const examAttempted = new ExamAttempted({
      examineeId: user._id,
      examId: exam._id,
      score,
      totalMarks,
      passingMarks: parseInt(exam.passingMarks),
      status: passed ? 'Passed' : 'Failed',
      resultStatus: 'Pending',
    });

    await examAttempted.save();
    res.json({ message: 'Exam submitted successfully' });
  } catch (err) {
    console.error('Error submitting exam:', err);
    res.status(500).json({ error: 'Failed to submit exam' });
  }
});

// ------------------ REPORT (ALL ATTEMPTS) ------------------
router.get('/report', async (req, res) => {
  try {
    const exams = await ExamAttempted.find()
      .populate('examineeId', 'name email')
      .populate('examId', 'title date time');

    const report = exams.map(exam => ({
      examineeEmail: exam.examineeId?.email,
      examTitle: exam.examId?.title,
      examineeName: exam.examineeId?.name,
      score: exam.score,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      status: exam.status,
      resultStatus: exam.resultStatus,
      attemptedAt: exam.createdAt
    }));

    res.json(report);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// ------------------ DECLARE RESULT ------------------
router.post('/result/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await ExamAttempted.findByIdAndUpdate(
      id,
      { resultStatus: 'Completed', updatedAt: new Date() },
      { new: true }
    ).populate('examId');
    if (!exam) {
      return res.status(404).json({ message: "Exam attempt not found" });
    }
    return res.json({ message: "Result Declared Successfully", exam });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while declaring result" });
  }
});

// ------------------ PENDING RESULTS ------------------
// get all pending examinations for declaration
router.get('/examination', async (req, res) => {
  try {
    const examination = await ExamAttempted.find({ resultStatus: 'Pending' })
      .populate('examId', 'title date')       // fetch exam title + date
      .populate('examineeId', 'name email');  // fetch examinee name + email

    if (!examination || examination.length === 0) {
      return res.json({ message: [] }); // always return an array
    }

    return res.json({ message: examination });
  } catch (error) {
    console.error("Error fetching examination:", error);
    res.status(500).json({ error: "Failed to fetch examination" });
  }
});


// ------------------ GET RESULT FOR SPECIFIC USER ------------------
router.get('/examinee-result/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const examination = await ExamAttempted.find({
      resultStatus: 'Completed',
      examineeId: id
    })
      .populate('examId', 'title date time')
      .populate('examineeId', 'name email');

    return res.json({ message: examination });
  } catch (error) {
    console.error('Error fetching examinee result:', error);
    return res.status(500).json({ error: 'Failed to fetch result' });
  }
});

module.exports = router;
