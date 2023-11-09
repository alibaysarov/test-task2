"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DishesController_1 = require("../controllers/DishesController");
const validation_1 = require("../utils/validation");
const authMiddleware_1 = require("../utils/authMiddleware");
const storage_1 = __importDefault(require("../storage"));
const dishesRouter = express_1.default.Router();
dishesRouter.get('/all', DishesController_1.DishesController.getAll);
dishesRouter.post('/create', storage_1.default.single('avatar'), authMiddleware_1.authenticateToken, validation_1.dishValidation, DishesController_1.DishesController.createDish);
dishesRouter.put('/update/:id', storage_1.default.single('avatar'), authMiddleware_1.authenticateToken, validation_1.dishValidation, DishesController_1.DishesController.updateDish);
dishesRouter.delete('/delete/:id', authMiddleware_1.authenticateToken, DishesController_1.DishesController.deleteDish);
exports.default = dishesRouter;
