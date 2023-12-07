import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { traerDatosDePosteoPorID } from '../utils/llamados';
import { Button, Card } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';

function PostDetail() {

    const navigate = useNavigate()

    const [datos, setDatos] = useState();

    const { id } = useParams()

    const { usuario } = useAuthContext()

    console.log(usuario);

    console.log(id);

    const editar = (id) => {
        navigate('/editarposts/' + id);
    }
    const eliminar = (id) => {
        navigate('/eliminarposts/' + id);
    }

    const crearComentario = () => navigate('/crearcomentario/' + id)




    const traerDatos = async () => {
        try {
            const datos = await traerDatosDePosteoPorID(id);
            setDatos(datos);
        } catch (error) {
            console.error('Error al traer datos:', error);
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);

    console.log(datos);

    const editarComentario = (idComentario) => {
        navigate('/editarcomentario/' + id + '/' + idComentario)
    }
    const eliminarComentario = (idComentario) => {
        navigate('/eliminarcomentario/' + id + '/' + idComentario)
    }


    return (
        <>
            <Card className="shadow m-5">
                {datos ? (
                    <>
                        <div className='d-flex justify-content-end m-2'>

                            {
                                usuario && datos && (usuario.id === datos.autor._id) && (
                                    <>
                                        <Button variant="primary me-2" onClick={() => editar(datos._id)} >Editar</Button>
                                        <Button variant="danger" onClick={() => eliminar(datos._id)} >Eliminar</Button>
                                    </>
                                )
                            }

                        </div>
                        <div className='d-flex justify-content-center'>
                            <Card.Img variant="top" src={datos.linkImg} className="w-50 h-50" />
                        </div>
                        <Card.Body>
                            <Card.Title>{datos.titulo}</Card.Title>
                            <Card.Text>{datos.desc}</Card.Text>
                            <Card.Title className='m-2'>Comentarios</Card.Title>
                            {datos.comments && datos.comments.length > 0 ? (

                                datos.comments.map((comentario, key) => (
                                    <Card className='mb-3'>
                                        <Card.Header as="h5" className='d-flex align-items-center'>
                                            <span className="flex-grow-1">{comentario.autor.usuario}</span>
                                            {
                                                usuario && comentario && (usuario.id === comentario.autor._id) && (
                                                    <>
                                                        <Button variant="primary me-2" onClick={() => editarComentario(comentario._id)} >Editar</Button>
                                                        <Button variant="danger" onClick={() => eliminarComentario(comentario._id)} >Eliminar</Button>
                                                    </>
                                                )
                                            }

                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {comentario.desc}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))



                            ) :
                                <>
                                    <Card.Text>Todavia no hay comentarios, se el primero en hacerlo!</Card.Text>
                                </>
                            }
                            {
                                usuario && (
                                    <div className='d-flex justify-content-end'>
                                        <Button variant="success" className='m-3' onClick={crearComentario}>Comentar</Button>
                                    </div>
                                )
                            }
                            <Card.Text className='mt-5'> {new Date(datos.createdAt).getDate()} / {new Date(datos.createdAt).getMonth() + 1} / {new Date(datos.createdAt).getFullYear()} </Card.Text>
                        </Card.Body>
                    </>
                ) : ''

                }

            </Card >
        </>
    )
}

export default PostDetail