import axios from 'axios';

const url = 'http://localhost:2000/';

const traerDatosDePosteoPorID = async (id) => {
    
    const endpoint = url + 'post/' + id;

    try {
        const respuesta = await axios.get(endpoint);

        if (respuesta.status === 200) {
            return respuesta.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

const traerDatosDeComentarioPorID = async (id) => {

    try {
        const respuesta = await axios.get('http://localhost:2000/comment/' + id);

        if (respuesta.status === 200) {
            return respuesta.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}


export {
    traerDatosDePosteoPorID,
    traerDatosDeComentarioPorID
}