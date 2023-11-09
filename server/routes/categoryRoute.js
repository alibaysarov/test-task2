"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const authMiddleware_1 = require("../utils/authMiddleware");
const categoryRouter = express_1.default.Router();
categoryRouter.get('/all', CategoryController_1.CategoryController.getAll);
categoryRouter.post('/create', authMiddleware_1.authenticateToken, CategoryController_1.CategoryController.addCategory);
categoryRouter.put('/update/:id', authMiddleware_1.authenticateToken, CategoryController_1.CategoryController.updateCategory);
categoryRouter.delete('/delete/:id', authMiddleware_1.authenticateToken, CategoryController_1.CategoryController.deleteCategory);
exports.default = categoryRouter;
