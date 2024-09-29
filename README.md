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


## Authentication
This API uses **Bearer Token** authentication. Include the token in the `Authorization` header of each request.

## Endpoints

### 1. Get All Events

- **Endpoint:** `GET /api/events`
- **Description:** Retrieves a list of all events.
- **Response:**
    - **Status Code:** `200 OK`
    - **Body:**
    ```json
    [
    {
        "name": "test1",
        "description": "test desc",
        "dates": [
            {
                "date": "Mon Sep 30 2024 00:00:00 GMT+0530 (India Standard Time)",
                "votes": [
                    "test2"
                ],
                "voted": false
            }
        ],
        "totalVotes": 1,
        "addVote": false,
        "id": "66f99119f33a6963a9a867f7"
    },
    {
        "name": "test2",
        "description": "test2 desc",
        "dates": [
            {
                "date": "Mon Sep 30 2024 00:00:00 GMT+0530 (India Standard Time)",
                "votes": [
                    "test2"
                ],
                "voted": false
            }
        ],
        "totalVotes": 1,
        "addVote": false,
        "id": "66f9912cf33a6963a9a867fa"
    }]
    ```



### 2. Create a New Event

- **Endpoint:** `POST /api/v1/events`
- **Description:** Creates a new event.
- **Request Body:**
    - **Payload:**
    ```json
    {
    "name": "test3",
    "description": "test3",
    "dates": "2024/09/30"
}
    ```
- **Response:**
    - **Status Code:** `201 Created`
    - **Body:**
    ```json
    {
    "name": "test3",
    "dates": [
        {
            "date": "2024/09/30",
            "votes": []
        }
    ],
    "id": "66f991b1f33a6963a9a86823",
    "addVote": false}
    ```

### 4. Update an Existing Event

- **Endpoint:** `PUT /api/v1/events/:id`
- **Description:** Updates an existing event by its unique ID.
- **Parameters:**
    - `id`: The unique identifier of the event.
- **Request Body:**
    - **Payload:**
    ```json
    {
    "votes": [
        {
            "date": "Mon Sep 30 2024 00:00:00 GMT+0530 (India Standard Time)"
        }
    ]}
    ```
- **Response:**
    - **Status Code:** `200 OK`
    - **Body:**
    ```json
    {
    "message": "Votes updated successfully"
    }
    ```
- **Error Response:**
    - **Status Code:** `404 Not Found`
    - **Body:**
    ```json
    {
        "error": "Event not found"
    }
    ```

### 5. Delete an Event

- **Endpoint:** `DELETE /api/v1/events/:id`
- **Description:** Deletes an event by its unique ID.
- **Parameters:**
    - `id`: The unique identifier of the event.
- **Response:**
    - **Status Code:** `204 No Content`
    - **Body:** (No content)

- **Error Response:**
    - **Status Code:** `404 Not Found`
    - **Body:**
    ```json
    {
        "error": "Event not found"
    }
    ```

## Error Handling
All error responses should include an appropriate HTTP status code and an error message in the response body, formatted as shown in the error responses above.

## Conclusion
This API provides basic CRUD operations for managing events. Ensure that each request is authenticated and validated on the server side for security and data integrity.

