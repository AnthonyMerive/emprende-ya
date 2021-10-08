import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
}
from "react-router-dom";
import Navbar from '../components/NavBar'
import LandingPage from '../components/LandingPage'
import Cards from '../components/Cards'
import AddEmprendimiento from '../components/AddEmprendimiento'
import MisEmprendimientos from '../components/MisEmprendimientos'
import PrivateRoute from './PrivateRoute'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Footer from '../components/Footer'
import BotonAddEmp from '../components/BotonAddEmp';

export default function AppRouter() {

    const [auth, setAuth] = useState(false)


    const usuarioLogeado = useSelector(store => store.login)

    useEffect(() => {
        usuarioLogeado.uid ?
            setAuth(true)
            :
            setAuth(false)
    }, [usuarioLogeado])

    return (

        <Router>

            <Navbar auth={auth} />

            <Switch>

                <PrivateRoute auth={auth} exact path="/agregarProducto" component={AddEmprendimiento} />
                
                <PrivateRoute auth={auth} exact path="/misProductos" component={MisEmprendimientos} />

                {auth ?
                    <Route exact path="/" component={Cards} />
                    :
                    <Route exact path="/" component={LandingPage} />
                }

            </Switch>

            {auth&&
                <BotonAddEmp />
            }
            <Footer />

        </Router>


    )
}
