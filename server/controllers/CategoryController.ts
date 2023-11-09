import {Request,Response} from "express";
import {prisma} from "../app";

export class CategoryController {

    static async getAll(req:Request,res:Response){
        try {
            const categories=await prisma.category.findMany()
            if(categories) {
                res.status(200).json(categories)
            } else {
                res.status(404).send("No categories")
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    static async addCategory(req:Request,res:Response){
        try{
            const name:string=req.body.name
            if(!name.length){
                res.status(403).send("Enter category name")
                return
            }
            const candidate=await prisma.category.findFirst({
                where:{
                    name:name
                }
            })
            if(candidate){
                res.status(403).send("Categories must be unique!")
                return
            }
            const  avatar=req.file?.filename
            try {
                const newCategory= await prisma.category.create({
                    data:{
                        name:name,
                        avatar
                    }
                })
            } catch (e) {
                res.status(500).json(e)
            }

            res.status(201).send("Category successfully added")
        } catch (e) {
            res.status(500).json(e)
        }
    }
    static async updateCategory(req:Request,res:Response) {
        const {name}=req.body
        const id:number=+req.params.id
        if(!name.length) {
            res.status(403).send("Enter a name")
        }
        const avatar=req.file?.filename

        try {
            const categoryToUpdate= await prisma.category.update({
                where:{
                    id,
                },
                data:{
                    name,
                    avatar
                }
            })
            res.status(201).send("Category updated")
        } catch (e) {
            res.status(500).send("Updating error occurred!")
        }



    }
    static async deleteCategory(req:Request,res:Response) {
        const id:number =+req.params.id
        try {
            try {
                const categoryToDelete= await prisma.category.delete({
                    where:{
                        id:id
                    }
                })
            } catch (e) {
                res.status(500).send("Deleting error")
            }
            res.status(200).send("Category deleted!")
        } catch (e) {
            res.status(500).json(e)
        }
    }
}