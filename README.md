# Shubham-Tribhuvan-AIPlagiarismDetector
## [Deployment Link](https://shubham-tribhuvan-ai-plagiarism-detector-7eo2492du.vercel.app)
## [DEMO VIDEO](https://www.loom.com/share/7abd1b595f3f45df84af4554df90240b?sid=e4dc6143-b658-4b58-b8a6-9bee6af3965f)

### AI Plagiarism Detector
A full-stack AI-powered plagiarism detection platform that allows users to upload documents (PDF, Word) and get real-time plagiarism detection results using 
ChatGPT/Claude. This project demonstrates full-stack development skills by integrating AI tools and React, with deployment on Vercel.

### Features
-Real-time Plagiarism Detection: Upload documents and receive AI-generated plagiarism reports.

-AI API Integration: Powered by ChatGPT/Claude for accurate content analysis.

-User-Friendly Interface: Simple and intuitive UI designed for educational institutions.

-Responsive Design: Fully responsive and works seamlessly on desktop, tablet, and mobile devices.

-Downloadable Reports: Get plagiarism reports with highlighted flagged sections and percentage of plagiarized content.

### Frontend Setup (React)

-Prerequisites

Node.js: Ensure you have Node.js installed (v16 or above).

npm: Comes with Node.js; used to install dependencies.

# Installation

Clone the repository:

```git clone https://github.com/Shubhamtribhuvan8/Shubham-Tribhuvan-AIPlagiarismDetector```


-Navigate to the frontend directory:
```cd ai-plagarism-detector-frontend```

Install dependencies:
```npm install```

Run the React app locally:
```npm start```

-Frontend Environment Variables:

Create a .env file in the frontend directory with the following variables:

```REACT_APP_API_URL=http://localhost:8080```

Access the application:

The React application should now be running at ```http://localhost:3000```.

### Technologies Used

### React: A JavaScript library for building user interfaces.

### Axios: For making API requests.

### Tailwind CSS: For styling and ensuring responsiveness.


### Backend Setup (Node.js with AI API Integration)

-Prerequisites

# Node.js: Ensure you have Node.js installed (v16 or above).

npm: Used to install backend dependencies.

OpenAI API Key: You need an OpenAI API key to integrate ChatGPT for plagiarism detection.

Alternative Setup Using gowinston.ai:

This project can also use gowinston.ai for plagiarism detection.

Created with gowinston.ai:

The plagiarism detection system has been integrated using the gowinston.ai API for accuracy and real-time results.

# Installation

Navigate to the backend directory:

```cd ai-plagarism-detector-backend```

-Install dependencies:
```npm install```

-Backend Environment Variables: Create a .env file in the backend directory with the following variables:

``` PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
CLAUDI_API_KEY=
CHAT_GPT_API_KEY=
CHAT_GPT_API_URL=https://api.openai.com/v1/files
GO_WINSTON_API_KEY= ```
 
Run the Node.js server:
```npm start```

-API Endpoints:
The backend server will be running on ```http://localhost:8080```.

The main endpoint is:

``POST /api/plagiarism-check: Accepts a document (PDF/Word) and returns the plagiarism report using AI processing.``


### Vercel Deployment

# Deploying to Vercel

This project has been deployed to Vercel. You can access the live version via this link[https://shubham-tribhuvan-ai-plagiarism-detector-7eo2492du.vercel.app/].

To redeploy or deploy updates, push the changes to the GitHub repository, and Vercel will automatically trigger the deployment.

### Folder Structure

Clone the repository:

git clone [https://github.com/USERNAME/AIPlagiarismDetector.git](https://github.com/Shubhamtribhuvan8/Shubham-Tribhuvan-AIPlagiarismDetector)
