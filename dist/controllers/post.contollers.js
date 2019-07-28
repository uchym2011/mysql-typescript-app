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
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const posts = yield conn.query('SELECT * FROM posts');
        res.json(posts);
    });
}
exports.getPosts = getPosts;
;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        console.log(newPost);
        const conn = yield database_1.connect();
        yield conn.query('INSERT INTO  posts SET ?', [newPost]);
        return res.json({
            message: 'Post został dodany!'
        });
    });
}
exports.createPost = createPost;
;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield database_1.connect();
        const post = yield conn.query('SELECT  * FROM posts WHERE id = ?', [id]);
        return res.json(post[0]);
    });
}
exports.getPost = getPost;
;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield database_1.connect();
        const post = yield conn.query('DELETE FROM posts WHERE id = ?', [id]);
        return res.json({
            message: 'Post został usunięty!'
        });
    });
}
exports.deletePost = deletePost;
;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const updatePost = req.body;
        const conn = yield database_1.connect();
        const post = yield conn.query('UPDATE posts SET ? WHERE id = ?', [updatePost, id]);
        return res.json({
            message: 'Post został zmieniony!'
        });
    });
}
exports.updatePost = updatePost;
;
