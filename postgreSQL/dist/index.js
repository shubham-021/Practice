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
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://neondb_owner:npg_MdrGIZ1DgmJ0@ep-jolly-scene-a1z8tit7-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
    });
}
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY ,
        username VARCHAR(255) UNIQUE NOT NULL ,
        email VARCHAR(255) NOT NULL ,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log(result);
    });
}
function InsertDb(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertQuery = "INSERT INTO users (username , email , password) VALUES ($1 , $2 , $3)";
        const values = [username, email, password];
        const res = yield client.query(insertQuery, values);
        console.log(res);
    });
}
function showDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const showQuery = "SELECT * FROM users";
        const res = yield client.query(showQuery);
        console.log(res);
    });
}
connectDB();
showDB();
