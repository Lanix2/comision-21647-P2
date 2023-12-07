import React from 'react'
import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../context/AuthContext';

function Home() {

    const { usuario } = useAuthContext()

    const backgroundImage = {
        backgroundImage: 'url("https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/TSUQ23STNBOZJGTXQYEI2ATP2E.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    return (
        <div style={backgroundImage} className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-body-emphasis mb-5'>Bienvenido a ImTravel  </h1>
            <h2 className='text-body-emphasis mb-5'>{usuario ? usuario.usuario : ''}</h2>
            <p className='fs-4'>Aqui podras compartir tus experiencias mas hermosas</p>
            


        </div>
    )
}

export default Home