import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = 'secret-123';
interface User {
    id: number;
    email: string;
}

// Extend the Request type to include a 'user' property
declare module 'express' {
    interface Request {
        user?: User; // Add your user properties here
    }
}
// Authentication middleware
export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Get the token from the request's Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err: VerifyErrors | null, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed' });
        }

        // Token is valid; attach user information to the request
        req.user = user as User;

        // Continue to the next middleware or route handler
        next();
    });
}