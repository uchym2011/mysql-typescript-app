import { Request, Response } from "express";

import { connect } from '../database';
import { Project } from '../interface/Project';

export async function getProjectsUsers(req: Request, res: Response) {

    const userId = req.params.userId;
    const conn = await connect();

    console.log('select * from projects where userid = ?',[userId]);
    const project: Project = await conn.query('select * from projects where userid = ?',[userId]);

    conn.end;
    return res.json(project); 
}
