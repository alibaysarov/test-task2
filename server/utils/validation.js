"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dishValidation = exports.registerUserDto = exports.loginUserDTO = void 0;
const express_validator_1 = require("express-validator");
const checkForErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        next();
    }
    else {
        return res.status(400).json({ errors: errors.array() });
    }
};
exports.loginUserDTO = [
    (0, express_validator_1.check)('email')
        .notEmpty()
        .isEmail()
        .withMessage("Enter email correctly")
        .isString()
        .withMessage('Email must be a string'),
    (0, express_validator_1.check)('password')
        .notEmpty()
        .isString()
        .withMessage('Password must be a string'),
    checkForErrors
];
exports.registerUserDto = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Enter your name')
        .isString()
        .withMessage('Name must be a string'),
    (0, express_validator_1.check)('email')
        .notEmpty()
        .isEmail()
        .withMessage("Enter email correctly")
        .isString()
        .withMessage('Email must be a string'),
    (0, express_validator_1.check)('password')
        .notEmpty()
        .isString()
        .withMessage('Password must be a string'),
    checkForErrors,
];
exports.dishValidation = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Enter a dish name')
        .isString()
        .withMessage('Dish name must be a string'),
    (0, express_validator_1.check)('price')
        .notEmpty()
        .withMessage('Enter a price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),
    checkForErrors,
    (0, express_validator_1.check)('categoryId')
        .notEmpty()
        .isFloat({ gt: 0 })
];
