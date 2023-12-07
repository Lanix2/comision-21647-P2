import React, { useRef, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import axios from 'axios';


import { useNavigate } from 'react-router-dom';

function Register() {

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const navigate = useNavigate()

    const correo = useRef()
    const usuario = useRef()
    const passw = useRef()
    const linkAvatar = useRef()


    

    const mandarDatos = async () => {

        const datos = {
            "usuario": usuario.current.value,
            "pass": passw.current.value,
            "email": correo.current.value,
            "linkAvatar": linkAvatar.current.value

        }

        try {
            const respuesta = await axios.post('http://localhost:2000/user', datos);

            if (respuesta.status === 200) {
                alert("Creo correctamente el usuario")
                
                return navigate('/login');
            } else {
                alert("Error al crear el usuario, usuario o correo ya existente")
                
            }
        } catch (error) {
            alert("error fatal")
            
        }

        setDeshabilitarBoton(false);
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (correo.current.value && usuario.current.value && passw.current.value && linkAvatar.current.value) {

            await mandarDatos()


        } else {
            alert("Faltan campos por completar")
           
        }

    };

    return (
        <Form className='m-5'>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" className='border-black' ref={correo} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUser">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="user" className='border-black' ref={usuario} />
                </Form.Group>
            </Row>

            

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="pass" className='border-black' ref={passw} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Avatar link</Form.Label>
                <Form.Control type='url' className='border-black' ref={linkAvatar} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                Registrarse
            </Button>
        </Form>
    )
}

export default Register