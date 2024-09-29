import { model } from "mongoose";
import { userSchema } from "../schemas/user.schema";
import bcrypt from "bcryptjs"
import { IUser } from "../types/user";

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Add method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.virtual('id').get(function () {
    return this._id.toString(); // Convert ObjectId to string
});

// Ensure virtual fields are included when converting to JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Create and export the model
const User = model<IUser>('User', userSchema);
export default User;