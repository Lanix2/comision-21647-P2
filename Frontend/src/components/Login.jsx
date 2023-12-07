import React, { useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios';


import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


function Login() {

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const { login } = useAuthContext()

    const navigate = useNavigate()

    const correo = useRef()
    const passw = useRef()

    


    const mandarDatos = async () => {

        const datos = {
            "email": correo.current.value,
            "pass": passw.current.value,
        }

        try {
            const respuesta = await axios.post('http://localhost:2000/authenticate', datos, { validateStatus: null });

            if (respuesta.status === 200) {

                const { data, token } = respuesta.data

                login(data, token)

                alert("Logeado correctamente");
                

                return navigate('/');

            } else if (respuesta.status === 401) {
                alert("Contraseña incorrecta")
                
            } else if (respuesta.status === 404) {
                alert("Email incorrecto")
                
            } else {
                alert("Error inesperado")
                
            }
        } catch (error) {
            alert("error fatal")
            
        }

        setDeshabilitarBoton(false);
    }

    const verificarDatos = async (e) => {

        e.preventDefault();

        if (correo.current.value && passw.current.value) {

            await mandarDatos()


        } else {
            alert("Faltan campos por completar")
            
        }


    };

    return (
        <Form className='m-5 p-5'>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Correo
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="email" ref={correo} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Contraseña
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="pass" ref={passw} />
                </Col>
            </Form.Group>

            <Button variant="primary" disabled={deshabilitarBoton} onClick={verificarDatos}>
                Iniciar Sesion
            </Button>
        </Form>
    )
}

export default Login