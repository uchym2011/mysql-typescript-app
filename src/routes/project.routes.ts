import { Router } from "express";

const router = Router();

import { getProjectsUsers } from '../controllers/projects.controllers';


import cors from 'cors';

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:4200",
  preflightContinue: false
};

//use cors middleware
router.use(cors(options));

router.route('/:userId')
      .get(getProjectsUsers);      

//enable pre-flight
router.options("*", cors(options));

      
export default router;