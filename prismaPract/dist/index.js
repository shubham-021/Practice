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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
function insertUser(email, password, firstname, lastname) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                email,
                password,
                firstname,
                lastname
            },
            select: {
                id: true,
                email: true
            }
        });
        console.log(res);
    });
}
function updateUser(email_1, _a) {
    return __awaiter(this, arguments, void 0, function* (email, { firstname, lastname }) {
        const res = yield prisma.user.update({
            where: { email },
            data: {
                firstname,
                lastname
            },
            select: {
                firstname: true,
                lastname: true
            }
        });
        console.log(res);
    });
}
function findUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findMany({
            where: { email },
            select: {
                id: true,
                firstname: true,
                lastname: true
            }
        });
        console.log(res);
    });
}
function insertTodo(title, done, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.create({
            data: {
                title,
                done,
                userId
            },
            select: {
                id: true,
                title: true
            }
        });
        console.log(res);
    });
}
function updateInTodo(id, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.update({
            where: { id },
            data: {
                description
            }
        });
        console.log(res);
    });
}
// insertUser("hey3@gmail.com" , "dscsc" , "Shubham" , "Singh")
// updateUser("hey3@gmail.com" , {firstname : "prakhand" , lastname : "patel"})
// findUser("hey3@gmail.com")
// insertTodo("Win UCL" , false , 1);
// updateInTodo(4 , "Soon")
// Relationships in Prisma
// types of relationships :
// 1. One to One
// 2. One to Many
// 3. Many to One
// 4. Many to Many
// for the todo app , there is one to many relationship
// one user_id can have many todos associated with it
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.delete({
            where: { id }
        });
    });
}
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.delete({
            where: { id }
        });
    });
}
// deleteUser(1)
// deleteTodo(1)
// deleteTodo(2)
// deleteTodo(3)
// deleteTodo(4)
deleteUser(1);
