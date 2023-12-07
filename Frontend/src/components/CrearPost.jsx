import React, { useRef, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


import { useAuthContext } from '../context/AuthContext';

function CrearPost() {

    const navigate = useNavigate();

    const { token } = useAuthContext()

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const titulo = useRef()
    const descripcion = useRef()
    const imagenURL = useRef()

    


    const mandarDatos = async () => {

        const datos = {
            "titulo": titulo.current.value,
            "desc": descripcion.current.value,
            "linkImg": imagenURL.current.value
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post('http://localhost:2000/post', datos, { headers: headers });

            if (respuesta.status === 200) {
                alert("Post creado exitosamente")
                
                return navigate('/posts');
            } 
        } catch (error) {
            alert("Error inesperado, inicie sesion nuevamente")
        }

        setDeshabilitarBoton(false);
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (titulo.current.value && descripcion.current.value && imagenURL.current.value ) {

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
                    <Form.Control className='border-black' type="text" ref={titulo} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Descripción
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" ref={descripcion} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    ImagenURL
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" ref={imagenURL} />
                </Col>
            </Form.Group>

            <Button variant="primary" disabled={deshabilitarBoton} onClick={handleFormSubmit}>
                Crear publicación
            </Button>
        </Form>
    )
}

export default CrearPost