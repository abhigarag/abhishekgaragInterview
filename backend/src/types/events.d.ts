import mongoose, { Schema } from "mongoose";

interface EventDocument extends Document {
    name: string;
    description:string;
    dates: {
        date: Date;
        votes: mongoose.Types.ObjectId[]; // Array of user IDs referencing the User model
    }[];
    postedBy:Schema.Types.ObjectId;
    totalVotes: number;
}