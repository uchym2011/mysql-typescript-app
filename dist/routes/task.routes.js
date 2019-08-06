"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const tasks_controllers_1 = require("../controllers/tasks.controllers");
const cors_1 = __importDefault(require("cors"));
//options for cors midddleware
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:4300",
    preflightContinue: false
};
//use cors middleware
router.use(cors_1.default(options));
//add your routes
router.route('/')
    .get(tasks_controllers_1.getTasks)
    .post(tasks_controllers_1.createTask);
router.route('/:taskId')
    .get(tasks_controllers_1.getTask)
    .delete(tasks_controllers_1.deleteTask)
    .put(tasks_controllers_1.updateTask);
//enable pre-flight
router.options("*", cors_1.default(options));
exports.default = router;
