import { Router } from "express";

const router = Router();

import { getTasks, createTask, getTask, deleteTask, updateTask, createUpdateTask } from '../controllers/tasks.controllers';


import cors from 'cors';

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:4300",
  preflightContinue: false
};

//use cors middleware
router.use(cors(options));


//add your routes

router.route('/')
      .get(getTasks)
      .post(createTask)
      .put(createUpdateTask);

router.route('/:taskId')
      .get(getTask)
      .delete(deleteTask)
      .put(updateTask)

      ;      

//enable pre-flight
router.options("*", cors(options));

      
export default router;