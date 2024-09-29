import { Schema } from "mongoose";
import { IUser } from "../types/user";


export const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});