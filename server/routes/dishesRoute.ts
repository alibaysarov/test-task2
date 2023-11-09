import express,{Router,Request,Response} from "express";
import {DishesController} from "../controllers/DishesController";
import {dishValidation} from "../utils/validation";
import {authenticateToken} from "../utils/authMiddleware";
import upload from "../storage";
const dishesRouter:Router=express.Router()

dishesRouter.get('/all',DishesController.getAll)
dishesRouter.post('/create',upload.single('avatar'),authenticateToken,dishValidation,DishesController.createDish)
dishesRouter.put('/update/:id',upload.single('avatar'),authenticateToken,dishValidation,DishesController.updateDish)
dishesRouter.delete('/delete/:id',authenticateToken,DishesController.deleteDish)
export default  dishesRouter