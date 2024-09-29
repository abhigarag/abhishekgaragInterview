import { Request, Response } from 'express';

import User from '../models/user.model';
import { generateToken } from '../utilities/jwt.utils';
import bcrypt from "bcryptjs"

// Helper to generate JWT



// Controller for user login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            const newUser = new User({ email, password });
            await newUser.save();
            res.status(200).json({
                message:"Signed up successfully",
                token:generateToken(newUser.id)
            })
        }
        else if(await user.comparePassword(password)){
            res.status(200).json({
                message: 'Login successful',
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller for getting user profile (protected route)
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    const {id}=req.query
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};