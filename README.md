# twitter-backend
A RESTful API backend for a Twitter-like social media application, built with Node.js, Express, and MongoDB.

Twitter Backend
A RESTful API backend for a Twitter-like social media application, built with Node.js, Express, and MongoDB.
🎯 Project Overview
This backend provides authentication, tweet management, hashtag tracking, and like functionality for the Hackatweet social platform. It features secure user authentication with password hashing, token-based sessions, and full CRUD operations for tweets.
🛠️ Technologies

Node.js & Express.js - Server framework
MongoDB & Mongoose - Database and ODM
bcrypt - Password hashing
uid2 - Token generation
CORS - Cross-origin resource sharing
dotenv - Environment variable management

✨ Features
Authentication

User registration with secure password hashing (bcrypt)
Login with token-based authentication
Session management with unique user tokens

Tweet Management

Create tweets with hashtag support (max 280 characters)
Retrieve all tweets with user population
Delete tweets
Automatic hashtag extraction and tracking

Hashtag System

Automatic hashtag counting
Retrieve trending hashtags sorted by popularity
Increment/decrement counts on tweet creation/deletion

Like System

Like/unlike tweets
Track likes per tweet and per user
Prevent duplicate likes

📁 Project Structure
hackatweet-backend/
├── bin/
│   └── www.js              # Server configuration
├── models/
│   ├── connection.js       # MongoDB connection
│   ├── users.js           # User schema
│   ├── tweet.js           # Tweet schema
│   ├── hashtag.js         # Hashtag schema
│   └── like.js            # Like schema
├── routes/
│   ├── users.js           # Authentication routes
│   ├── tweets.js          # Tweet CRUD routes
│   ├── hashtags.js        # Hashtag routes
│   └── likes.js           # Like/unlike routes
├── modules/
│   └── checkBody.js       # Request validation helper
├── app.js                 # Express app configuration
└── .env                   # Environment variables
🚀 Getting Started
Prerequisites

Node.js (v14+)
MongoDB Atlas account or local MongoDB installation
npm or yarn

Installation

Clone the repository

bashgit clone https://github.com/your-username/hackatweet-backend.git
cd hackatweet-backend

Install dependencies

bashyarn install
# or
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```
CONNECTION_STRING=your_mongodb_connection_string
PORT=3000

Start the development server

bashyarn dev
# or
npm run dev
The API will be available at http://localhost:3000
📡 API Endpoints
Users

POST /users/signup - Register a new user
POST /users/signin - Login user

Tweets

GET /tweets - Get all tweets (sorted by date, newest first)
POST /tweets - Create a new tweet (requires token)
DELETE /tweets/:id - Delete a tweet

Hashtags

GET /hashtags - Get all hashtags (sorted by count, top 10)
GET /hashtags/:tag - Get specific hashtag data

Likes

POST /likes - Like a tweet (requires token)
DELETE /likes - Unlike a tweet (requires token)
GET /likes - Get all likes

🔐 Security Features

Passwords hashed with bcrypt (salt rounds: 10)
Token-based authentication
Request body validation
CORS protection

🤝 Related Project
This backend pairs with the Hackatweet Frontend built with Next.js and Redux.
👩‍💻 Author
Sue Lemarinel
Full-Stack JavaScript Developer in Training