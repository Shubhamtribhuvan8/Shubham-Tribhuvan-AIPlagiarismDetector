# Shubham-Tribhuvan-AIPlagiarismDetector
# AI Plagiarism Detector
A full-stack AI-powered plagiarism detection platform that allows users to upload documents (PDF, Word) and get real-time plagiarism detection results using ChatGPT/Claude. This project demonstrates full-stack development skills by integrating AI tools and React, with deployment on Vercel.

## Features
Real-time Plagiarism Detection: Upload documents and receive AI-generated plagiarism reports.
AI API Integration: Powered by ChatGPT/Claude for accurate content analysis.
User-Friendly Interface: Simple and intuitive UI designed for educational institutions.
Responsive Design: Fully responsive and works seamlessly on desktop, tablet, and mobile devices.
Downloadable Reports: Get plagiarism reports with highlighted flagged sections and percentage of plagiarized content.

# Frontend Setup (React)

Prerequisites
Node.js: Ensure you have Node.js installed (v16 or above).
npm: Comes with Node.js; used to install dependencies.

Installation
Clone the repository:

git clone https://github.com/USERNAME/AIPlagiarismDetector.git
cd AIPlagiarismDetector

Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Run the React app locally
npm start

Frontend Environment Variables: Create a .env file in the frontend directory with the following variables:
REACT_APP_API_URL=http://localhost:5000

Access the application:
The React application should now be running at http://localhost:3000.

Technologies Used
React: A JavaScript library for building user interfaces.
Axios: For making API requests.
Tailwind CSS: For styling and ensuring responsiveness.

# Backend Setup (Node.js with AI API Integration)

Prerequisites
Node.js: Ensure you have Node.js installed (v16 or above).
npm: Used to install backend dependencies.
OpenAI API Key: You need an OpenAI API key to integrate ChatGPT for plagiarism detection.

Installation
Navigate to the backend directory:
cd backend

Install dependencies:
npm install

Backend Environment Variables: Create a .env file in the backend directory with the following variables:
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
CLAUDI_API_KEY=
CHAT_GPT_API_KEY=
CHAT_GPT_API_URL=https://api.openai.com/v1/files
GO_WINSTON_API_KEY=

Run the Node.js server:
npm start

API Endpoints:
The backend server will be running on http://localhost:5000.

The main endpoint is:
POST /api/plagiarism-check: Accepts a document (PDF/Word) and returns the plagiarism report using AI processing.


Vercel Deployment
Deploying to Vercel
This project has been deployed to Vercel. You can access the live version via this link.
To redeploy or deploy updates, push the changes to the GitHub repository, and Vercel will automatically trigger the deployment.

## Folder Structure

│
├── frontend/             # React frontend code
│   ├── public/           # Public assets
│   ├── src/              # Main source code (components, hooks, styles)
│   ├── .env              # Environment variables for frontend
│   └── package.json      # React dependencies and scripts
│
├── backend/              # Node.js backend code
│   ├── controllers/      # API logic and ChatGPT integration
│   ├── routes/           # Backend API routes
│   ├── .env              # Environment variables for backend
│   └── package.json      # Node.js dependencies and scripts
│
└── README.md             # Project documentation

How to Run Locally
Clone the repository:

git clone https://github.com/USERNAME/AIPlagiarismDetector.git
