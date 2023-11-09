"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'secret-123';
// Authentication middleware
function authenticateToken(req, res, next) {
    // Get the token from the request's Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Verify the token
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed' });
        }
        // Token is valid; attach user information to the request
        req.user = user;
        // Continue to the next middleware or route handler
        next();
    });
}
exports.authenticateToken = authenticateToken;
