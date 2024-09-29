import  { Schema,Types } from "mongoose";
import { EventDocument } from "../types/events";

export const eventSchema = new Schema<EventDocument>({  
    name: { type: String, required: true },
    description: { type: String },
    dates: [
        {
            date: { type: String, required: true },
            votes: [{ type: Types.ObjectId, ref: 'User' }] // Reference to the User model
        }
    ],
    postedBy:{type: Types.ObjectId, ref: 'User' },
    totalVotes: { type: Number, default: 0 }
});