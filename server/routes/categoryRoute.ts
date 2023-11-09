import express,{Router,Request,Response} from "express";
import {CategoryController} from "../controllers/CategoryController";
import {authenticateToken} from "../utils/authMiddleware";
const categoryRouter:Router=express.Router()

categoryRouter.get('/all',CategoryController.getAll)
categoryRouter.post('/create',authenticateToken,CategoryController.addCategory)
categoryRouter.put('/update/:id',authenticateToken,CategoryController.updateCategory)
categoryRouter.delete('/delete/:id',authenticateToken,CategoryController.deleteCategory)
export default  categoryRouter