import { Router } from 'express';

const router = Router();

import { indexWelcome } from '../controllers/index.controller';

router.route('/')
      .get(indexWelcome);
      //.get((req, res) => res.json('Witaj w moim API'));

export default router;