const { viewUsers, userView, createdUser, editUser, deleteUser, findUserByusuario } = require('../controllers/userController');

const userRouter = require('express').Router();

userRouter.get('/users', viewUsers);
userRouter.get('/user/:id', userView);
userRouter.post('/user', createdUser);
userRouter.put('/user', editUser);
userRouter.delete('/user', deleteUser);
userRouter.get('/usuario', findUserByusuario);


module.exports = userRouter