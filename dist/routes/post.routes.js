"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const post_contollers_1 = require("../controllers/post.contollers");
router.route('/')
    .get(post_contollers_1.getPosts)
    .post(post_contollers_1.createPost);
router.route('/:postId')
    .get(post_contollers_1.getPost)
    .delete(post_contollers_1.deletePost)
    .put(post_contollers_1.updatePost);
exports.default = router;
