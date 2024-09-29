import jwt from "jsonwebtoken"

/**
 * function to generate token
 * @param id 
 * @returns jwt token
 */
export const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
};