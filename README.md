Description
This project is a full-stack application with a Node.js backend and a React frontend. The backend is written in TypeScript, and the frontend is developed using React. The repository is organized into two folders:




Prerequisites
Node.js: Make sure you have Node.js installed (preferably v14+).
npm: Ensure that you have npm (Node Package Manager) installed. It comes with Node.js.
npx: npx is included with npm, and you will need it to run TypeScript code directly with ts-node.

Setup Instructions
1. Clone the repository


git clone https://github.com/abhigarag/abhishekgaragInterview.git
cd abhishekgaragInterview

2. Install dependencies for both backend and frontend
Install Backend Dependencies
Navigate to the backend directory and install the necessary packages:


cd backend
npm install
Install Frontend Dependencies
Navigate to the frontend directory and install the necessary packages:

cd ../frontend
npm install
Running the Applications
Start the Backend
To run the Node.js backend with TypeScript, use the following command:

paste the content in backend/.env *shared in mail*

cd backend
npx ts-node src/index.ts
The backend server will start, and you can access it at the specified port (usually http://localhost:5000 or as configured).

Start the Frontend
To run the React frontend, use the following commands:

cd ../frontend
npm start
This will start the React development server, and the app will be accessible at http://localhost:3000.

Concurrently Running Backend and Frontend
To run both the backend and frontend simultaneously, you can open two terminals:

In one terminal, navigate to the backend folder and run the backend (npx ts-node src/index.ts).
In the second terminal, navigate to the frontend folder and run the frontend (npm start).
Alternatively, you can create a root-level package.json and use concurrently to run both at once if you want a single command to handle it. Example:

npm install concurrently --save-dev
Then, add the following script to the root package.json:

json

"scripts": {
    "dev": "concurrently \"npx ts-node backend/src/index.ts\" \"npm start --prefix frontend\""
}
You can then run both the frontend and backend with a single command:



npm run dev
Environment Variables
Ensure you have the necessary environment variables in both the backend and frontend folders. Typically, these variables are stored in .env files.

Backend: .env file might include database credentials, JWT secret, etc.
Frontend: .env file might include API endpoints and keys.
Additional Scripts
Linting and Formatting
If you have linters and formatters set up for TypeScript and React, you can run the following commands:

Backend linting:
cd backend
npm run lint
Frontend linting:
cd ../frontend
npm run lint
Build for Production
Frontend: To build the React app for production, run:


cd frontend
npm run build
This will create an optimized production build in the build directory.
