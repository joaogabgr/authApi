import { Router } from 'express';
import userList from '../controllers/userControlers/userList';
import userProfile from '../controllers/userControlers/userProfile';
import createUser from '../controllers/userControlers/createUser';
import deleteUser from '../controllers/userControlers/deleteUser';
import loginUser from '../controllers/userControlers/loginUser';
import validateToken from '../controllers/userControlers/validateToken';

const userRouter = Router();

//GET
userRouter.get('/userList', userList);
userRouter.get('/userProfile/:id', userProfile);

//POST
userRouter.post('/userCreate', createUser);
userRouter.post('/userLogin', loginUser);
userRouter.post('/validateToken', validateToken);

//DELETE
userRouter.delete('/userDelete/:id', deleteUser);

export default userRouter;