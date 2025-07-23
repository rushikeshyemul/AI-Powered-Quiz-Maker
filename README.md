# Quiz App

## Backend Setup (Node.js/Express/MongoDB)

This project now includes a backend for user authentication and quiz storage using MongoDB Atlas.

### 1. Install backend dependencies

```
cd backend
npm install
```

### 2. Create a `.env` file in the backend directory:

```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_here
```

### 3. Start the backend server

```
npm run dev
```

The backend will run on `http://localhost:5000` by default.

---

# QuizMaster - AI-Powered Quiz Generator

A comprehensive quiz application with AI-generated questions, user authentication, and engineering-focused topics.

## Features

- **AI-Powered Questions**: Integration with OpenAI API for dynamic question generation
- **Engineering Topics**: Specialized topics including OS, Data Structures, DBMS, Computer Networks, OOP, and more
- **User Authentication**: Secure login and registration system
- **Customizable Quizzes**: Choose topic, difficulty, question count, and time limit
- **Real-time Quiz Interface**: Interactive quiz with timer and progress tracking
- **Detailed Results**: Comprehensive score analysis with explanations
- **PDF Upload**: Support for custom quiz questions from PDF files
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory and add your Together API key:

```env
VITE_TOGETHER_API_KEY=your_together_api_key_here
```

### 2. Get Together API Key

1. Visit [Together AI Platform](https://api.together.xyz/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## Available Topics

### Core Computer Science
- Operating Systems
- Data Structures
- Algorithms
- Database Management Systems
- Computer Networks
- Object-Oriented Programming
- Software Engineering
- Computer Architecture

### Programming Languages
- Java Programming
- Python Programming
- C++ Programming
- JavaScript
- React.js
- Node.js

### Advanced Topics
- Machine Learning
- Artificial Intelligence
- Cybersecurity
- Cloud Computing
- DevOps
- System Design

### Mathematics & Theory
- Discrete Mathematics
- Theory of Computation
- Compiler Design
- Digital Logic Design

## Demo Credentials

For testing purposes, you can use:
- **Email**: user@example.com
- **Password**: password

## API Integration

The application uses Together AI's Llama-2-7b-chat-hf model to generate contextually relevant questions based on the selected topic and difficulty level. If no API key is provided, the application falls back to a curated question bank with topic-specific questions.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **API**: OpenAI GPT-3.5-turbo
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom gradients and animations

## Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── common/        # Shared components
│   ├── layout/        # Layout components
│   ├── quiz/          # Quiz-related components
│   └── ui/            # Reusable UI components
├── context/           # React context providers
├── services/          # API services
├── types/             # TypeScript type definitions
└── main.tsx          # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
