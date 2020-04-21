import { Request, Response } from "express";

import { connect, getConnect } from '../database';
import { Project } from '../interface/Project';

export async function getProjectsUsers(req: Request, res: Response) {

    console.log('........ export async function getProjectsUsers');

    const userId = req.params.userId;
    const conn = await getConnect();

    //console.log('select * from projects where userid = ?', [userId]);
    const project: Project = await conn.query('select * from projects where userid = ?', [userId]);

    conn.destroy()
    conn.end;
    return res.json(project);

}

export async function insertProjectIfNotExists(req: Request, res: Response) {

    console.log('........ export async function insertProjectIfNotExists');

    const newProject: Array<Project> = req.body;
    const conn = await getConnect();

    try {

        //console.log(req.body);

        const check1 = await conn.query('SELECT COUNT(*) ifExists FROM projects WHERE userid = ? and status = "B"', [newProject[0].userId]);
        //console.log('check1[0].ifExists = ' + check1[0].ifExists);

        if (check1[0].ifExists > 0) {
            // * Sprawdzenie czy już był taki insert, chroni przed dublowaniem rekordów 
            //console.log('Nie wstawiam');
            const check = await conn.query('SELECT projectid FROM projects WHERE userid = ? and status = "B"', [newProject[0].userId]);
            return res.json({
                message: 'Project userid: ' + newProject[0].userId + ' projectId: ' + newProject[0].projectId + ' projectid z bazy: ' + check[0].projectid + ' został utworzony!',
                projectId: check[0].projectid
            });

        } else {
            //console.log('Wstawiam');
            await conn.query('insert into projects set ?', [newProject[0]]);

            return res.json({
                message: 'Project userid: ' + newProject[0].userId + ' projectId: został utworzony!'
            });
        }


    } finally {

        conn.end;
        conn.destroy();

        console.log('################## insertProjectIfNotExists conn.release()');

    }

}

export async function insertProject(req: Request, res: Response) {

    console.log('........ export async function insertProject');

    const newProject: Array<Project> = req.body;
    const conn = await getConnect();

    //console.log('inserProject ..::.. insert into projects set ?', [newProject[0]]);
    
    await conn.query('insert into projects set ?', [newProject[0]]);

    conn.end;
    conn.destroy();
    
    return res.json({
        message: 'Project userid: ' + newProject[0].userId + ' projectId: ' + newProject[0].projectId + ' został utworzony!'
    });
}