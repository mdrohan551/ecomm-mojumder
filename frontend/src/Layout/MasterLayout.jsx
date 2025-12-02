import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
// jehetu ata nested route props hobena outlet hobe 
const MasterLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MasterLayout