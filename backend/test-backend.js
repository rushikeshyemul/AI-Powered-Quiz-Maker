import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const MONGO_URI = 'mongodb://127.0.0.1:27017/quiz-app';
const JWT_SECRET = 'your-secret-key-here'; // This should match your backend

// Create a test token
const testUserId = new mongoose.Types.ObjectId();
const testToken = jwt.sign({ id: testUserId.toString() }, JWT_SECRET);

console.log('Test token:', testToken);

// Test API endpoints
async function testBackend() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Test quiz creation
    const quizData = {
      topic: 'Test Quiz',
      questions: [
        {
          question: 'Test question?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'Test explanation'
        }
      ],
      timeLimit: 10
    };

    console.log('Testing quiz creation...');
    const quizResponse = await fetch('http://localhost:5000/api/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${testToken}`
      },
      body: JSON.stringify(quizData)
    });

    if (quizResponse.ok) {
      const quiz = await quizResponse.json();
      console.log('Quiz created successfully:', quiz._id);

      // Test quiz attempt creation
      const attemptData = {
        quizId: quiz._id,
        topic: 'Test Quiz',
        answers: [0, 1, 2],
        score: 2,
        totalQuestions: 3,
        timeTaken: 120,
        difficulty: 'medium'
      };

      console.log('Testing quiz attempt creation...');
      const attemptResponse = await fetch('http://localhost:5000/api/quiz/attempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${testToken}`
        },
        body: JSON.stringify(attemptData)
      });

      if (attemptResponse.ok) {
        const attempt = await attemptResponse.json();
        console.log('Quiz attempt created successfully:', attempt._id);

        // Test fetching attempts
        console.log('Testing fetch attempts...');
        const attemptsResponse = await fetch('http://localhost:5000/api/quiz/attempts', {
          headers: {
            'Authorization': `Bearer ${testToken}`
          }
        });

        if (attemptsResponse.ok) {
          const attempts = await attemptsResponse.json();
          console.log('Attempts fetched successfully:', attempts.length, 'attempts');
        } else {
          console.error('Failed to fetch attempts:', await attemptsResponse.text());
        }
      } else {
        console.error('Failed to create attempt:', await attemptResponse.text());
      }
    } else {
      console.error('Failed to create quiz:', await quizResponse.text());
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testBackend(); 