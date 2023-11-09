import {Request,Response} from "express";
import {compare, hash} from "bcrypt"
import {prisma} from "../app";
const secretKey = 'secret-123';
import * as jwt from "jsonwebtoken"
interface IRegisterUser {
    name:string,
    email:string,
    password:string
}

export class UserController {
    static async register(req:Request,res:Response) {
        try {
            const{name,password,email}:IRegisterUser=req.body;
            const candidate= await prisma.user.findFirst({
                where:{
                    email
                }
            })
            if(candidate) {
                res.status(400).send("User with this email is already registered")
            }
            const hashedPassword:string = await hash(password, 10);
            try {
                const newUser= await prisma.user.create({
                    data:{
                        name,
                        email,
                        password:hashedPassword
                    }
                })
                const token = jwt.sign({ email }, secretKey, { expiresIn: '10h' });
                return res.status(201).json({
                    user: {
                        name:newUser.name,
                        email:newUser.email,
                        token
                    }
                })
            } catch (e) {
                res.status(500).send("Error on creating user!")
            }

        } catch (e) {
            res.status(500).json(e)
        }
    }

    static  async login(req:Request,res:Response) {
        try {
            const {email,password}=req.body
            const user = await prisma.user.findFirst({
                where:{
                    email
                }
            })
            if(!user){
                res.status(401).send("Authentication failed!")
                return
            }
            // @ts-ignore
            const passwordMatch = await compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            const token = jwt.sign({ email }, secretKey, { expiresIn: '10h' });
            return res.status(200).json({
                user:{
                    name:user.name,
                    email:user.email,
                    token

                },
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }
    static async checkAuth(req:Request,res:Response){
        try {
            if(req.user) {
                return res.status(200).json(req.user)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    static async getMe(req:Request,res:Response) {
        if(req.user){
            const {email}=req.user;
            try {
                const profileUser= await prisma.user.findFirst({
                    where:{
                        email
                    },
                    select:{
                        id:true,
                        email:true,
                        name:true,
                    }
                })
                return res.status(200).json(profileUser)
            }catch (e) {
                res.status(500).json(e)
            }
        }

    }
}