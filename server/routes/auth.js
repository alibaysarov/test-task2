"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../utils/validation");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../utils/authMiddleware");
const router = express_1.default.Router();
router.post('/register', validation_1.registerUserDto, UserController_1.UserController.register);
router.post('/login', validation_1.loginUserDTO, UserController_1.UserController.login);
router.get('/getMe', authMiddleware_1.authenticateToken, UserController_1.UserController.getMe);
router.get('/check', authMiddleware_1.authenticateToken, UserController_1.UserController.checkAuth);
exports.default = router;
