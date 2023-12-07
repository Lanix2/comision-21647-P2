import React, { useEffect, useRef, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { traerDatosDePosteoPorID } from '../utils/llamados';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


import { useAuthContext } from '../context/AuthContext';

function EditarPost() {

    const navigate = useNavigate()

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const [datosEditar, setDatosEditar] = useState();

    const { token } = useAuthContext()

    

    const { id } = useParams()

    const traerDatos = async () => {
        try {
            const datos = await traerDatosDePosteoPorID(id);
            setDatosEditar(datos);
        } catch (error) {
            console.error('Error al traer datos:', error);
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);


    const titulo = useRef()
    const descripcion = useRef()
    const imagenURL = useRef()

    const mandarDatos = async () => {

        const datos = {
            "id": datosEditar._id,
            "titulo": titulo.current.value,
            "desc": descripcion.current.value,
            "linkImg": imagenURL.current.value
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.put('http://localhost:2000/post', datos, { headers: headers, validateStatus: null });

            if (respuesta.status === 200) {
                alert("Post editado correctamente");
                
                return navigate('/posts');
            } else if (respuesta.status === 500) {
                alert("No puede editar una publicación ajena");
                
            }
        } catch (error) {
            alert("Error inesperado")
            
        }

        setDeshabilitarBoton(false);

    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (titulo.current.value && descripcion.current.value && imagenURL.current.value) {

            await mandarDatos()


        } else {
            alert("Faltan campos por completar")
            
        }


    };

    return (
        <Form className='m-5 p-5'>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Título
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" defaultValue={datosEditar ? datosEditar.titulo : ''} ref={titulo} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Descripción
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" defaultValue={datosEditar ? datosEditar.desc : ''} ref={descripcion} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    ImagenURL
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" defaultValue={datosEditar ? datosEditar.linkImg : ''} ref={imagenURL} />
                </Col>
            </Form.Group>

            <Button variant="primary" disabled={deshabilitarBoton} onClick={handleFormSubmit}>
                Editar
            </Button>
        </Form>
    )
}

export default EditarPost