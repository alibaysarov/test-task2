"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = require("bcrypt");
const app_1 = require("../app");
const secretKey = 'secret-123';
const jwt = __importStar(require("jsonwebtoken"));
class UserController {
    static async register(req, res) {
        try {
            const { name, password, email } = req.body;
            const candidate = await app_1.prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (candidate) {
                res.status(400).send("User with this email is already registered");
            }
            const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
            try {
                const newUser = await app_1.prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword
                    }
                });
                const token = jwt.sign({ email }, secretKey, { expiresIn: '10h' });
                return res.status(201).json({
                    user: {
                        name: newUser.name,
                        email: newUser.email,
                        token
                    }
                });
            }
            catch (e) {
                res.status(500).send("Error on creating user!");
            }
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await app_1.prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (!user) {
                res.status(401).send("Authentication failed!");
                return;
            }
            // @ts-ignore
            const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            const token = jwt.sign({ email }, secretKey, { expiresIn: '10h' });
            return res.status(200).json({
                user: {
                    name: user.name,
                    email: user.email,
                    token
                },
            });
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    static async checkAuth(req, res) {
        try {
            if (req.user) {
                return res.status(200).json(req.user);
            }
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    static async getMe(req, res) {
        if (req.user) {
            const { email } = req.user;
            try {
                const profileUser = await app_1.prisma.user.findFirst({
                    where: {
                        email
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    }
                });
                return res.status(200).json(profileUser);
            }
            catch (e) {
                res.status(500).json(e);
            }
        }
    }
}
exports.UserController = UserController;
