import express from'express';
var router = express.Router();

import businessRouter from './controllers/business.js'
import usersRouter from './controllers/users.js';

router.use('/business', businessRouter)
router.use('/usersRouter', usersRouter)


export default router;