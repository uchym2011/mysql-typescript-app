import { Request, Response } from "express";

import { connect } from '../database';
import { Post } from '../interface/Posts'; 

export async function getPosts(req: Request, res: Response){
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM posts');
    res.json(posts);
};

export async function createPost(req: Request, res: Response) {
    const newPost: Post =  req.body;
    console.log(newPost);
    const conn = await connect();
    await conn.query('INSERT INTO  posts SET ?', [newPost]);
    return res.json({
        message: 'Post został dodany!'
    });
};

export async function getPost(req: Request, res: Response) {
    const id =  req.params.postId;
    const conn = await connect();
    const post = await conn.query('SELECT  * FROM posts WHERE id = ?', [id]);
    return res.json(post[0]);
};

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