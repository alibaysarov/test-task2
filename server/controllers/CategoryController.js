"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const app_1 = require("../app");
class CategoryController {
    static async getAll(req, res) {
        try {
            const categories = await app_1.prisma.category.findMany();
            if (categories) {
                res.status(200).json(categories);
            }
            else {
                res.status(404).send("No categories");
            }
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    static async addCategory(req, res) {
        try {
            const name = req.body.name;
            if (!name.length) {
                res.status(403).send("Enter category name");
                return;
            }
            const candidate = await app_1.prisma.category.findFirst({
                where: {
                    name: name
                }
            });
            if (candidate) {
                res.status(403).send("Categories must be unique!");
                return;
            }
            const avatar = req.file?.filename;
            try {
                const newCategory = await app_1.prisma.category.create({
                    data: {
                        name: name,
                        avatar
                    }
                });
            }
            catch (e) {
                res.status(500).json(e);
            }
            res.status(201).send("Category successfully added");
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    static async updateCategory(req, res) {
        const { name } = req.body;
        const id = +req.params.id;
        if (!name.length) {
            res.status(403).send("Enter a name");
        }
        const avatar = req.file?.filename;
        try {
            const categoryToUpdate = await app_1.prisma.category.update({
                where: {
                    id,
                },
                data: {
                    name,
                    avatar
                }
            });
            res.status(201).send("Category updated");
        }
        catch (e) {
            res.status(500).send("Updating error occurred!");
        }
    }
    static async deleteCategory(req, res) {
        const id = +req.params.id;
        try {
            try {
                const categoryToDelete = await app_1.prisma.category.delete({
                    where: {
                        id: id
                    }
                });
            }
            catch (e) {
                res.status(500).send("Deleting error");
            }
            res.status(200).send("Category deleted!");
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
}
exports.CategoryController = CategoryController;
