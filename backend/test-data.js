import mongoose from 'mongoose';
import QuizAttempt from './models/QuizAttempt.js';
import User from './models/User.js';
import Quiz from './models/Quiz.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/quiz-app';

// Sample data for testing
const sampleAttempts = [
  {
    topic: 'JavaScript Fundamentals',
    score: 8,
    totalQuestions: 10,
    timeTaken: 300, // 5 minutes
    difficulty: 'medium',
    completedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    topic: 'React Hooks',
    score: 7,
    totalQuestions: 10,
    timeTaken: 420, // 7 minutes
    difficulty: 'hard',
    completedAt: new Date('2024-01-14T14:20:00Z')
  },
  {
    topic: 'CSS Grid',
    score: 9,
    totalQuestions: 10,
    timeTaken: 240, // 4 minutes
    difficulty: 'easy',
    completedAt: new Date('2024-01-13T09:15:00Z')
  },
  {
    topic: 'TypeScript Basics',
    score: 6,
    totalQuestions: 10,
    timeTaken: 360, // 6 minutes
    difficulty: 'medium',
    completedAt: new Date('2024-01-12T16:45:00Z')
  },
  {
    topic: 'Node.js Express',
    score: 10,
    totalQuestions: 10,
    timeTaken: 300, // 5 minutes
    difficulty: 'medium',
    completedAt: new Date('2024-01-11T11:30:00Z')
  }
];

async function createTestData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Create a test user
    const testUser = await User.findOne({ email: 'test@example.com' }) || 
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    // Create test quizzes
    const quizzes = await Promise.all(
      sampleAttempts.map(async (attempt) => {
        return await Quiz.create({
          user: testUser._id,
          topic: attempt.topic,
          questions: [],
          timeLimit: 600
        });
      })
    );

    // Create test attempts
    const attempts = await Promise.all(
      sampleAttempts.map(async (attempt, index) => {
        return await QuizAttempt.create({
          user: testUser._id,
          quiz: quizzes[index]._id,
          topic: attempt.topic,
          answers: [],
          score: attempt.score,
          totalQuestions: attempt.totalQuestions,
          timeTaken: attempt.timeTaken,
          difficulty: attempt.difficulty,
          completedAt: attempt.completedAt
        });
      })
    );

    console.log('Test data created successfully!');
    console.log(`Created ${attempts.length} quiz attempts for user: ${testUser.name}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating test data:', error);
  }
}

createTestData(); 