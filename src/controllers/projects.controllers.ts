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

export async function insertProject(req: Request, res: Response) {

    const newProject: Array<Project> = req.body;
    const conn = await connect();

    console.log('insert into projects set ?',[newProject[0].projectId, newProject[0].name, newProject[0].userId]);
    await conn.query('insert into users set ?',[newProject[0]]);

    return res.json({
        message: 'Project ' + newProject[0].userId + ' ' + newProject[0].projectId +' został utworzony!'
    });
}
