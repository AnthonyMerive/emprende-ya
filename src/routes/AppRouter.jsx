import React from 'react'
import AddEmprendimiento from '../components/AddEmprendimiento'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SidebarPerfil from '../components/SidebarPerfil'
import Cards from '../components/Cards'
import LandingPage from '../components/LandingPage'

export default function AppRouter() {
    return (
        <>
            <NavBar />
            <LandingPage/>
            {/* <Cards /> */}
            {/* <SidebarPerfil /> */}
            {/* <AddEmprendimiento /> */}
            <Footer />
            


        </>
    )
}
