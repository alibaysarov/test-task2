"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("./routes/auth"));
const dishesRoute_1 = __importDefault(require("./routes/dishesRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
console.log(__dirname);
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)());
app.use('/api/dishes', dishesRoute_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/categories', categoryRoute_1.default);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
