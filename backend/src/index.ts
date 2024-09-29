import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';
import connectDB from "./utilities/dbconnect.utils"
import eventRoutes from './routes/events.route';
import cors from "cors";



dotenv.config();

// Initialize the app
const app: Application = express();
app.use(cors());
// Middleware
app.use(express.json());
// Routes
app.use('/api', userRoutes);
app.use('/api/events',eventRoutes );

// Connect to MongoDB
connectDB();

// Health check route
app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
