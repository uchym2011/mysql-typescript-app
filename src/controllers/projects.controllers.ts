import { Request, Response } from "express";

import { connect } from '../database';
import { Project } from '../interface/Project';

export async function getProjectsUsers(req: Request, res: Response) {

    const userId = req.params.userId;
    const conn = await connect();

    console.log('select * from projects where userid = ?', [userId]);
    const project: Project = await conn.query('select * from projects where userid = ?', [userId]);

    conn.end;
    return res.json(project);
}

export async function insertProjectIfNotExists(req: Request, res: Response) {

    const newProject: Array<Project> = req.body;
    const conn = await connect();

    console.log(req.body);

    const check1 = await conn.query('SELECT COUNT(*) ifExists FROM projects WHERE userid = ? and status = "B"', [newProject[0].userId]);
    console.log('check1[0].ifExists = ' + check1[0].ifExists);

    if (check1[0].ifExists > 0) {
        // * Sprawdzenie czy już był taki insert, chroni przed dublowaniem rekordów 
        console.log('Nie wstawiam');
        const check = await conn.query('SELECT projectid FROM projects WHERE userid = ? and status = "B"', [newProject[0].userId]);
        return res.json({
            message: 'Project userid: ' + newProject[0].userId + ' projectId: ' + newProject[0].projectId + ' projectid z bazy: ' + check[0].projectid + ' został utworzony!',
            projectId: check[0].projectid
        });

    } else {
        console.log('Wstawiam');
        await conn.query('insert into projects set ?', [newProject[0]]);
        conn.end;

        const conn2 = await connect();
        const projectIns = await conn2.query('SELECT projectid FROM projects WHERE userid = ? and status = "B"', [newProject[0].userId]);
        conn2.end;

        return res.json({
            message: 'Project userid: ' + newProject[0].userId + ' projectId: ' + projectIns[0].projectId + ' został utworzony!'
        });
    }
    
}

export async function insertProject(req: Request, res: Response) {

    const newProject: Array<Project> = req.body;
    const conn = await connect();

    console.log('insert into projects set ?', [newProject[0].projectId, newProject[0].name, newProject[0].userId]);
    await conn.query('insert into users set ?', [newProject[0]]);

    return res.json({
        message: 'Project userid: ' + newProject[0].userId + ' projectId: ' + newProject[0].projectId + ' został utworzony!'
    });
}