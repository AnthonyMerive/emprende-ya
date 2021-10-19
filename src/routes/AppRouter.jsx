import React, { Suspense, lazy, useState, useEffect } from 'react'
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
import BotonAddEmp from '../components/BotonAddEmp';
import { Tips } from '../components/Tips';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Publicaciones from '../components/Publicaciones';


export default function AppRouter() {
    const authenticated = getAuth();
    const [auth, setAuth] = useState(false)
    const [checking, setChecking] = useState(true)


    const usuarioLogeado = useSelector(store => store.login)

    useEffect(() => {
        usuarioLogeado.uid ?
            setAuth(true)
            :
            setAuth(false)
        onAuthStateChanged(authenticated, async (user) => {
            setChecking(false)
        })
    }, [usuarioLogeado])

    if (checking) {
        return <Loading />;
    }

    return (

        <Router>

            <Navbar auth={auth} />

            <Switch>

                <PrivateRoute auth={auth} exact path="/agregarEmprendimiento" component={AddEmprendimiento} />

                <PrivateRoute auth={auth} exact path="/misEmprendimientos" component={MisEmprendimientos} />

                <PrivateRoute auth={auth} exact path="/tips" component={Tips} />

                {auth ?
                    <Route exact path="/" component={Cards} />
                    :
                    <Route exact path="/" component={LandingPage} />
                }

                <Route exact path="/publicaciones" component={Publicaciones} />

            </Switch>

            {(auth && usuarioLogeado.foto !== null) &&
                <BotonAddEmp />
            }

        </Router>

    )
}
