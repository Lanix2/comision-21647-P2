import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


import { Button, Col, Form, Row } from 'react-bootstrap';
import { traerDatosDeComentarioPorID } from '../utils/llamados';
import axios from 'axios';

function EditarComentraio() {

    const navigate = useNavigate()

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const [datosEditar, setDatosEditar] = useState();

    const { token } = useAuthContext()

    

    const { id, idComentario } = useParams()

    const traerDatos = async () => {
        try {
            const datos = await traerDatosDeComentarioPorID(idComentario);
            setDatosEditar(datos);
        } catch (error) {
            console.error('Error al traer datos:', error);
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);

    const comentario = useRef()


    const mandarDatos = async () => {

        const datos = {
            "id": idComentario,
            "desc": comentario.current.value,

        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.put('http://localhost:2000/comment', datos, { headers: headers, validateStatus: null });

            if (respuesta.status === 200) {
                alert("Ha editado correctamente el comentario")
                
                return navigate('/detallesposts/' + id);
            } else if (respuesta.status === 500) {
                alert("No puede editar un comentario ajeno")
                
            }
        } catch (error) {
            alert("Error inesperado")
            
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
                    <Form.Control className='border-black' as="textarea" defaultValue={datosEditar ? datosEditar.desc : ''} ref={comentario} />
                </Col>
            </Form.Group>

            
                <Button variant="primary" disabled={deshabilitarBoton} onClick={handleFormSubmit}>
                    Editar
                </Button>
            
        </Form>
    )
}

export default EditarComentraio