import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
const checkForErrors=(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
}
export const loginUserDTO =[
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage("Enter email correctly")
        .isString()
        .withMessage('Email must be a string'),
    check('password')
        .notEmpty()
        .isString()
        .withMessage('Password must be a string'),
    checkForErrors
]
export const registerUserDto =[
    check('name')
        .notEmpty()
        .withMessage('Enter your name')
        .isString()
        .withMessage('Name must be a string'),
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage("Enter email correctly")
        .isString()
        .withMessage('Email must be a string'),
    check('password')
        .notEmpty()
        .isString()
        .withMessage('Password must be a string'),
    checkForErrors,
]
export const dishValidation = [
    check('name')
        .notEmpty()
        .withMessage('Enter a dish name')
        .isString()
        .withMessage('Dish name must be a string'),
    check('price')
        .notEmpty()
        .withMessage('Enter a price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),
    checkForErrors,
    check('categoryId')
        .notEmpty()
        .isFloat({ gt: 0 })
];