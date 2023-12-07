const jwt = require('jsonwebtoken');
const user = require('../models/userModel')
const bcrypt = require('bcrypt');

const authController = {}

const JWT_KEY = process.env.JWT_KEY

authController.autenticar = async (req, res) => {
    try {

        const { email, pass } = req.body

        const userFound = await user.findOne({ email })

        if (userFound) {

            const passMatch = await bcrypt.compare(pass, userFound.pass);
            // console.log(pass);
            if (passMatch) {
                const datos = {
                    id: userFound._id,
                    email: userFound.email,
                    usuario: userFound.usuario,
                    linkAvatar: userFound.linkAvatar
                };

                let token = jwt.sign(datos, JWT_KEY, { expiresIn: '1h' });

                res.json({ token: token, data: datos });
            } else {
                return res.status(401).json({ mensaje: 'passw incorrecta' });
            }
        } else {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error interno' });
    }
}

authController.verificarToken = (req, res) => {
    const token = req.body.token;

    try {
        let desencriptado = jwt.verify(token, JWT_KEY);

        res.json({ datos: desencriptado });
        
    } catch (error) {
        res.status(500).json({
            mensaje: 'Se ha generado un error',
            error: error,
        });
    }
}


module.exports = authController;