"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = require("promise-mysql");
// mysql2/promise
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_mysql_1.createPool({
            host: '46.242.232.152',
            user: '00286230_mysql',
            password: '5WcK5uJ4TL2s93gy',
            database: '00286230_mysql',
            connectionLimit: 10
            /*host: 'mysql-sh220297.super-host.pl',
            user: 'db100042222_user',
            password: 'Z3uyDunL',
            database: 'db100042222',
            connectionLimit: 10*/
        });
        console.log('Połaczenie z bazą poprawne!!');
        return connection;
    });
}
exports.connect = connect;
