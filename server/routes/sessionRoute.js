const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// CREATE
router.post('/', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    return res.json({ message: "Session Added Successfully" });
  } catch (error) {
    console.error("POST /session error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const session = await Session.find();
    return res.json({ data: session });
  } catch (error) {
    console.error("GET /session error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Session.findByIdAndDelete(id);
    return res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("DELETE /session error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Session.findByIdAndUpdate(id, req.body);
    return res.json({ message: "Updated Successfully" });
  } catch (error) {
    console.error("PUT /session error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;