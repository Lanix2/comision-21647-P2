const { autenticar, verificarToken } = require('../controllers/authController');

const authRouter = require('express').Router();

authRouter.post('/authenticate', autenticar)
authRouter.post('/verifyToken', verificarToken)


module.exports = authRouter