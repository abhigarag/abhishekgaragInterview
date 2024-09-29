export interface IUser extends Document {
    email: string;
    password: string;
    createdAt: Date;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
}