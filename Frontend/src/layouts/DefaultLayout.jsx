import React from 'react'
import MyNavbar from '../components/MyNavbar'

function DefaultLayout({children}) {

    return (
        <>
            <MyNavbar />
            <div>
                {children}
            </div>
        </>
    )
}

export default DefaultLayout