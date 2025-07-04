"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../prisma/generated/prisma");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = new prisma_1.PrismaClient();
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const ret = yield client.user.create({
            data: {
                username: body.username,
                firstname: body.firstname,
                lastname: body.lastname,
                password: body.password
            },
            select: {
                username: true
            }
        });
        res.json({
            username: ret.username
        });
    }
    catch (err) {
        console.error(err);
        res.json({
            message: "Some error occurred"
        });
    }
}));
app.listen(3000);
