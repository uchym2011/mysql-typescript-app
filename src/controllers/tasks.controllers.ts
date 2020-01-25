import { Request, Response } from "express";

import { connect } from '../database';
import { Task } from '../interface/Tasks'; 

export async function getTasks(req: Request, res: Response){
    const conn = await connect();
    const tasks = await conn.query('SELECT * FROM tasks');
    res.json(tasks);
    //res.header()
};

export async function getTasksByUser(req: Request, res: Response){
    const userid = req.params.userId;
    const conn = await connect();
    const tasks = await conn.query('SELECT * FROM tasks WHERE userId = ?', [userid]);
    res.json(tasks);
    //res.header()
};

export async function createTask(req: Request, res: Response) {
    const newTask: Array<Task> = req.body; 
    console.log(JSON.stringify(newTask));

    const conn = await connect();

    for (var _i = 0; _i < newTask.length; _i++) {
        var item = newTask[_i];
        var itemId = newTask[_i].id;
        console.log('insert into tasks set ?',[newTask[_i]]);
        console.log('ID ===== ' + item.id);

        await conn.query('insert into tasks set ?',[newTask[_i]]);

    }

     for (var item of newTask) {
        //console.log(" test for "+item._id); // 9,2,5
    }
 
    return res.json({
        message: 'Zadanie zostało utworzone!'
    });
}

export async function getTaskByUser(req: Request, res: Response) {
    console.log("getTaskByUser");
    const id = req.params.userId;
    const conn = await connect();
    const task = await conn.query('SELECT * FROM tasks WHERE userId = ?', [id]);
    return res.json(task);
}

export async function getTask(req: Request, res: Response) {
    console.log("getTask");
    const id = req.params.taskId;
    const conn = await connect();
    const task = await conn.query('SELECT * FROM tasks WHERE ID = ?', [id]);
    return res.json(task[0]);
}

export async function deleteTask(req: Request, res: Response) {
    const id = req.params.taskId;
    const conn = await connect();
    const task = await conn.query('DELETE FROM tasks WHERE id = ?', [id]);
    return res.json({
        message: 'Zadanie zostało usunięte!'
    });
}

export async function deleteTaskByUser(req: Request, res: Response) {
    const taskid = req.params.taskId;
    const userid = req.params.userId;
    const conn = await connect();
    const task = await conn.query('DELETE FROM tasks WHERE id = ? AND userId = ?', [taskid, userid]);
    return res.json({
        message: 'Zadanie zostało usunięte!'
    });
}

export async function updateTask(req: Request, res: Response) {
    const id =  req.params.taskId;
    const updateTask = req.body;
    const conn = await connect();
    const post = await conn.query('UPDATE tasks SET ? WHERE id = ?', [updateTask, id]);
    return res.json({
        message: 'Post został zmieniony!'
    });
}

export async function updateTaskByUser(req: Request, res: Response) {
    const taskid = req.params.taskId;
    const userid = req.params.userId;
    const updateTask = req.body;
    const conn = await connect();
    const post = await conn.query('UPDATE tasks SET ? WHERE id = ? AND userId = ?', [updateTask, taskid, userid]);
    return res.json({
        message: 'Post został zmieniony!'
    });
}

export async function createUpdateTask(req: Request, res: Response) {
    console.log('createUpdateTask');
    const newTask: Array<Task> = req.body; 
    console.log('createUpdateTask' + req.body);
    const conn = await connect();

    for (var _i = 0; _i < newTask.length; _i++) {
        if (newTask[_i].id == null) {
            console.log(newTask[_i] + ' INSERTTTTTTTTTTTTTTT');
            console.log('INSERT INTO tasks SET ?',[newTask[_i]]);
            await conn.query('insert into tasks set ?',[newTask[_i]]);
        } else {
            console.log(newTask[_i] + ' UPDATEEEEEEEEEEEEEE');
            console.log('UPDATE tasks SET name = ?, isDone = ?, end = ? WHERE id = ?', [newTask[_i].name, newTask[_i].isDone, newTask[_i].end, newTask[_i].id]);
            await conn.query('UPDATE tasks SET name = ?, isDone = ?, end = ? WHERE id = ?', [newTask[_i].name, newTask[_i].isDone, newTask[_i].end, newTask[_i].id]);
        }
        //await conn.query('insert into tasks set ?',[newTask[_i]]);

    }


 
    return res.json({
        message: 'Zadania zostały zapisane!'
    });
}

export async function createUpdateTasksByUser(req: Request, res: Response) {
    const newTask: Array<Task> = req.body; 
    console.log('createUpdateTasksByUser');
    const conn = await connect();

    for (var _i = 0; _i < newTask.length; _i++) {
        if (newTask[_i].id == null) {
            console.log(newTask[_i] + ' INSERTTTTTTTTTTTTTTT');
            console.log('INSERT INTO tasks SET ?',[newTask[_i]]);
            await conn.query('insert into tasks set ?',[newTask[_i]]);
        } else {
            console.log(newTask[_i] + ' UPDATEEEEEEEEEEEEEE');
            console.log('UPDATE tasks SET name = ?, isDone = ?, end = ? WHERE id = ? AND userId = ?', [newTask[_i].name, newTask[_i].isDone, newTask[_i].end, newTask[_i].id, newTask[_i].userId]);
            await conn.query('UPDATE tasks SET name = ?, isDone = ?, end = ? WHERE id = ? AND userId = ?', [newTask[_i].name, newTask[_i].isDone, newTask[_i].end, newTask[_i].id, newTask[_i].userId]);
        }
        //await conn.query('insert into tasks set ?',[newTask[_i]]);

    }


 
    return res.json({
        message: 'Zadania zostały zapisane!'
    });
}


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