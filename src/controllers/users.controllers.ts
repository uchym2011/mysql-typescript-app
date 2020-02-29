import { Request, Response } from "express";

import { connect } from '../database';
import { User } from '../interface/Users'

export async function insertUser(req: Request, res: Response) {

    const newUser: Array<User> = req.body;
    const conn = await connect();

    console.log('insert into users set ?',[newUser[0].userId, newUser[0].firstName, newUser[0].surname]);
    await conn.query('insert into users set ?',[newUser[0]]);

    return res.json({
        message: 'User ' + newUser[0].firstName + ' ' + newUser[0].surname +' został utworzony!'
    });
}

export async function getUser(req: Request, res: Response) {

    const userId = req.params.userId;
    console.log('getUser userId: ' + userId);
    const conn = await connect();

    console.log('select * from users where userId = ?',[userId]);
    const user: User = await conn.query('select * from users where userId = ?',[userId]);

    conn.end;
    return res.json(user); 
}
