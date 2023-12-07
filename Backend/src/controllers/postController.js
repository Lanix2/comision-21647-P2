const post = require('../models/postModel');
const desencriptar = require('../utils/token');

const postController = {}

postController.viewPosts = async (req, res) => {
    try {

        const listPosts = await post.find().populate('autor').populate('comments');
        return res.json(listPosts);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });

    }
}

postController.postView = async (req, res) => {
    try {

        const { id } = req.params;
        const postFound = await post.findById(id)
            .populate('autor')
            .populate({
                path: 'comments',
                populate: { path: 'autor' }
            });;
        return res.json(postFound);

    } catch (error) {

        let mensaje = 'Ocurrió un error interno al intentar obtener el post';
        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener el post';
        }
        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}

postController.createdPost = async (req, res) => {

    try {
        const { titulo, desc, linkImg } = req.body;

        const { token } = req.headers;

        const tokenValido = desencriptar(token)

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'Token no valido',
            });
        }

        const autor = tokenValido.id

        const newPost = new post({
            titulo: titulo,
            desc: desc,
            autor: autor,
            linkImg: linkImg,
        });

        await newPost.save();

        return res.json({ mensaje: 'Post creado con éxito' });

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar crear el post',
            error: error
        });

    }
}

postController.editPost = async (req, res) => {
    try {

        const { id, titulo, desc, linkImg } = req.body;
        const { token } = req.headers;

        const tokenValido = desencriptar(token)

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'Token no valido',
            });
        }

        const userId = tokenValido.id
        const posteo = await post.findById(id)


        if (posteo.autor.toString() !== userId) {
            return res.status(500).json({
                mensaje: 'El autor no es el mismo'
            });
        }

        await post.findByIdAndUpdate(
            id,
            {
                titulo: titulo,
                desc: desc,
                linkImg: linkImg,
            }
        );
        return res.json({ mensaje: 'Post actualizado con éxito' });

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el post',
            error: error
        });
    }
}

postController.deletePost = async (req, res) => {
    try {

        const { id } = req.body;
        const { token } = req.headers;

        const tokenValido = desencriptar(token)

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'Token no valido',
            });
        }

        const userId = tokenValido.id
        const posteo = await post.findById(id)


        if (posteo.autor.toString() !== userId) {
            return res.status(500).json({
                mensaje: 'El autor no es el mismo'
            });
        }

        await post.findByIdAndDelete(id);
        return res.json({ mensaje: 'Post eliminada con éxito' });

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el post',
            error: error
        });

    }
}

postController.myPosts = async (req, res) => {
    try {

        const { token } = req.query;

        const tokenValido = desencriptar(token)

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'Token no valido',
            });
        }
        const userId = tokenValido.id


        const posts = await post.find({ autor: userId }).populate('autor');
        return res.json(posts)

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el post',
            error: error
        });

    }
}

module.exports = postController;