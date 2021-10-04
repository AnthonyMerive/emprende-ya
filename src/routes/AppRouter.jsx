import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from '../components/NavBar'
import LandingPage from '../components/LandingPage'
import Cards from '../components/Cards'
import AddEmprendimiento from '../components/AddEmprendimiento'
import PrivateRoute from './PrivateRoute'

export default function AppRouter() {

    let auth = false

    return (

        <Router>

            <Navbar auth={auth} />

            <Switch>

                <PrivateRoute auth={auth} exact path="/agregarProducto" component={AddEmprendimiento} />

                <Route exact path="/" component={LandingPage} />

                <Route exact path="/productos" component={Cards} />

            </Switch>

        </Router>


    )
}
