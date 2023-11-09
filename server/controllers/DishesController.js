"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishesController = void 0;
const app_1 = require("../app");
class DishesController {
    static async getAll(req, res) {
        try {
            const dishes = await app_1.prisma.dish.findMany({
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            if (dishes) {
                res.status(200).json(dishes);
            }
            else {
                res.status(404).send("Not found");
            }
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    static async createDish(req, res) {
        const { name, price, categoryId } = req.body;
        const dishAvatar = req.file?.filename;
        try {
            const newDish = await app_1.prisma.dish.create({
                data: {
                    name,
                    price,
                    categoryId: +categoryId,
                    avatar: dishAvatar
                },
            });
            res.status(200).send(newDish);
        }
        catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
    static async updateDish(req, res) {
        const id = +req.params.id;
        const { name, price, categoryId } = req.body;
        let avatar;
        if (req.file) {
            avatar = req.file?.filename;
        }
        else {
            avatar = req.body.avatar;
        }
        try {
            const updatedDish = await app_1.prisma.dish.update({
                where: {
                    id,
                },
                data: {
                    name,
                    price,
                    categoryId: +categoryId,
                    avatar
                }
            });
            res.status(200).send(updatedDish);
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    static async deleteDish(req, res) {
        const id = +req.params.id;
        try {
            const deletedDish = await app_1.prisma.dish.delete({
                where: {
                    id
                }
            });
            return res.status(200).send("Dish removed");
        }
        catch (e) {
            return res.status(500).json(e);
        }
    }
}
exports.DishesController = DishesController;
