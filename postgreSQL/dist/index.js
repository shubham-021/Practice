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
    connectionString: "postgresql://newsCollector_owner:npg_MqsbxmVw70XF@ep-lingering-fog-a1r274g0-pooler.ap-southeast-1.aws.neon.tech/newsCollector?sslmode=require&channel_binding=require"
});
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
    });
}
function showDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const showQuery = "SELECT * FROM headlines WHERE id=34";
        const res = yield client.query(showQuery);
        console.log(res);
    });
}
connectDB();
showDB();
