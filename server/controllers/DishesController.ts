import {Request,Response} from "express";
import {prisma} from "../app";
export interface IDish {
    name:string,
    price:number,
    categoryId:number,
    avatar?:string|File
}
export class DishesController{
    static async getAll(req:Request,res:Response){
        try{
            const dishes=await prisma.dish.findMany({
                include:{
                    category:{
                        select:{
                            name:true
                        }
                    }
                }
            })
            if(dishes){
                res.status(200).json(dishes)
            } else {
                res.status(404).send("Not found")
            }
        }catch (e) {
            res.status(500).json(e)
        }
    }

    static async createDish(req:Request,res:Response) {
        const {name,price,categoryId }:IDish=req.body
        const dishAvatar=req.file?.filename
        try {
            const newDish = await prisma.dish.create({
                data: {
                    name,
                    price,
                    categoryId:+categoryId,
                    avatar:dishAvatar
                },
            });
            res.status(200).send(newDish)

        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
    static async updateDish(req:Request,res:Response) {
        const id =+req.params.id
        const {name,price,categoryId}:IDish=req.body
        let avatar;
        if(req.file) {
            avatar = req.file?.filename
        } else{
            avatar = req.body.avatar
        }
        try {
            const updatedDish=await  prisma.dish.update({
                where:{
                    id,
                },
                data:{
                    name,
                    price,
                    categoryId:+categoryId,
                    avatar
                }
            })
            res.status(200).send(updatedDish)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    static async deleteDish(req:Request,res:Response) {
        const id:number =+req.params.id
        try {
            const deletedDish=await prisma.dish.delete({
                where:{
                    id
                }
            })
           return res.status(200).send("Dish removed")
        } catch (e) {
           return res.status(500).json(e)
        }
    }
}