import express,{Router} from "express";
import {loginUserDTO, registerUserDto} from "../utils/validation";
import {UserController} from "../controllers/UserController";
import {authenticateToken} from "../utils/authMiddleware";
const router:Router=express.Router()
router.post('/register',registerUserDto,UserController.register)
router.post('/login',loginUserDTO,UserController.login)
router.get('/getMe',authenticateToken,UserController.getMe)
router.get('/check',authenticateToken,UserController.checkAuth)
export default router;