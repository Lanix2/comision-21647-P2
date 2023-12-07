import React, { useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'


import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

function CrearComentario() {

    const { id } = useParams()
    
    const navigate = useNavigate()

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const comentario = useRef()

    const { token } = useAuthContext()

    

    const mandarDatos = async () => {

        const datos = {
            "desc": comentario.current.value,
            "post": id

        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post('http://localhost:2000/comment', datos, { headers: headers });

            if (respuesta.status === 200) {
                alert("Su comentario se cargó correctamente")
               
                return navigate('/detallesposts/' + id);
            }
        } catch (error) {
            alert("Error inesperado, inicie sesion nuevamente")
            console.log(error);
        }

        setDeshabilitarBoton(false);
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (comentario.current.value) {

            await mandarDatos()

        } else {
            alert("Faltan campos por completar")
            
        }

    };


    return (
        <Form className='m-5 p-5'>
                <Form.Label column sm="2">
                    Comentario
                </Form.Label>
            <Form.Group as={Row} className="mb-3">
                <Col sm="10">
                    <Form.Control className='border-black' as="textarea" ref={comentario} />
                </Col>
            </Form.Group>

                <Button variant="primary" disabled={deshabilitarBoton} onClick={handleFormSubmit}>
                    Comentar
                </Button>
           
        </Form>
    )
}

export default CrearComentario