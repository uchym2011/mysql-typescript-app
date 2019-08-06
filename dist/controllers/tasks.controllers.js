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
const database_1 = require("../database");
function getTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const tasks = yield conn.query('SELECT * FROM tasks');
        res.json(tasks);
        //res.header()
    });
}
exports.getTasks = getTasks;
;
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTask = req.body;
        console.log(JSON.stringify(newTask));
        const conn = yield database_1.connect();
        for (var _i = 0; _i < newTask.length; _i++) {
            var item = newTask[_i];
            console.log('insert into tasks set ?', [newTask[_i]]);
            yield conn.query('insert into tasks set ?', [newTask[_i]]);
        }
        /*     for (var item of newTask) {
                console.log(" test for "+item); // 9,2,5
            }
         */
        return res.json({
            message: 'Zadanie zostało utworzone!'
        });
    });
}
exports.createTask = createTask;
function getTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.taskId;
        const conn = yield database_1.connect();
        const task = yield conn.query('SELECT * FROM tasks WHERE ID = ?', [id]);
        return res.json(task[0]);
    });
}
exports.getTask = getTask;
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.taskId;
        const conn = yield database_1.connect();
        const task = yield conn.query('DELETE FROM tasks WHERE id = ?', [id]);
        return res.json({
            message: 'Zadanie zostało usunięte!'
        });
    });
}
exports.deleteTask = deleteTask;
function updateTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.taskId;
        const updateTask = req.body;
        const conn = yield database_1.connect();
        const post = yield conn.query('UPDATE tasks SET ? WHERE id = ?', [updateTask, id]);
        return res.json({
            message: 'Post został zmieniony!'
        });
    });
}
exports.updateTask = updateTask;
/*

export async function deletePost(req: Request, res: Response) {
    const id =  req.params.postId;
    const conn = await connect();
    const post = await conn.query('DELETE FROM posts WHERE id = ?', [id]);
    return res.json({
        message: 'Post został usunięty!'
    });
};

export async function updatePost(req: Request, res: Response) {
    const id =  req.params.postId;
    const updatePost = req.body;
    const conn = await connect();
    const post = await conn.query('UPDATE posts SET ? WHERE id = ?', [updatePost, id]);
    return res.json({
        message: 'Post został zmieniony!'
    });
};
 */ 
