import express from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client'

import authRouter from "./routes/auth";
import dishesRouter from "./routes/dishesRoute";
import categoryRouter from "./routes/categoryRoute";

import bodyParser from "body-parser";



console.log(__dirname)

export const prisma = new PrismaClient()
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(cors())
app.use('/api/dishes',dishesRouter)
app.use('/api/auth',authRouter)
app.use('/api/categories',categoryRouter)



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});