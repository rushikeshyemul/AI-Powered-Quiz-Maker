import express from 'express';
import jwt from 'jsonwebtoken';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Middleware to verify JWT
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Save a quiz
router.post('/', auth, async (req, res) => {
  try {
    const { topic, questions, timeLimit } = req.body;
    const quiz = await Quiz.create({
      user: req.userId,
      topic,
      questions,
      timeLimit,
    });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save quiz', error: err.message });
  }
});

// Get all quizzes for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.userId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
  }
});

export default router; 