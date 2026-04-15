const User = require('../models/Examinee');
const express = require('express');
const router = express.Router();
const sendEmail = require('../utills/sendMail');
const Examinee = require('../models/Examinee');

// ---------------- GET ALL ----------------
router.get('/', async (req, res) => {
  const examinee = await Examinee.find();
  return res.json({ data: examinee });
});

// ---------------- REGISTER ----------------
router.post('/', async (req, res) => {
  const { email, name } = req.body;

  const existingExaminee = await Examinee.findOne({ email: email });
  if (existingExaminee) {
    return res.status(400).json({ message: "Examinee with this email already exists." });
  }

  const examinee = new User(req.body);
  await examinee.save();

  res.status(200).json("You are registered successfully");

  // ✅ FIXED HTML (IMPORTANT)
  const html = `
  <div style="font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #e3f2fd, #ffffff); padding: 40px;">
    <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
     
      <div style="background: linear-gradient(90deg, #007bff, #00c6ff); padding: 25px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎓 Welcome to Softpro!</h1>
      </div>
     
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333;"><strong>Dear ${name},</strong></p>

        <p style="font-size: 16px; color: #555;">
          We're excited to welcome you to the <strong>Softpro Exam Prep</strong>!
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <!-- ✅ FIXED LINK -->
          <a href="https://exam-prep-kappa.vercel.app/login"
             style="background: #007bff; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
            🔐 Log in to Your Account
          </a>
        </div>

        <p style="margin-top: 30px;">
          Best regards,<br>
          <strong>Team Softpro</strong>
        </p>
      </div>

      <div style="background-color: #f1f1f1; text-align: center; padding: 20px;">
        This is an automated message.
      </div>
    </div>
  </div>
  `;

  setTimeout(async () => {
    await sendEmail(email, "Welcome to the Exam Portal", html);
  }, 100);
});

// ---------------- DELETE ----------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Examinee.findByIdAndDelete(id);
  return res.json({ message: "Deleted Successfully" });
});

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const examinee = await Examinee.findOne({ email: email });
  if (!examinee) {
    return res.json({ message: "Your email is incorrect" });
  }

  if (examinee.password == password) {
    return res.json({
      message: "Login Successfully",
      user: {
        email: examinee.email,
        role: "user",
        id: examinee._id
      }
    });
  } else {
    return res.json({ message: "Password incorrect" });
  }
});

// ---------------- CHANGE PASSWORD ----------------
router.put('/change/:id', async (req, res) => {
  const { op, np, cnp } = req.body;

  const examinee = await Examinee.findById(req.params.id);
  if (!examinee) {
    return res.json({ message: "Examinee not found" });
  }

  if (examinee.password !== op) {
    return res.json({ message: "Old password incorrect" });
  }

  if (np !== cnp) {
    return res.json({ message: "New passwords do not match" });
  }

  try {
    await Examinee.findByIdAndUpdate(req.params.id, { password: np });
    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------------- UPDATE ----------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await Examinee.findByIdAndUpdate(id, req.body);
  return res.json({ message: "Updated successfully" });
});

module.exports = router;