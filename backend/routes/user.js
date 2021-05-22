import express from 'express';
// import userControllers from '../controllers/user';
import { addUserApi, getUserApi, updateUserApi, deleteUserApi } from '../controllers/api.js';

const router = express.Router();
// const app = express();

router.post('/signup',addUserApi);
router.get('/login',getUserApi);
router.put('/update/:uid',updateUserApi);
router.delete('/delete/:uid',deleteUserApi);

// app.use('/signup',addUserApi);
// app.use('/login',getUserApi);
// app.use('/update/:uid',updateUserApi);
// app.use('/delete/:uid',deleteUserApi);


export default router;


