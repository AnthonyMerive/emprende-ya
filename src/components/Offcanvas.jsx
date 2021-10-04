import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Login from './Login'
import InterfazUsuario from './InterfazUsuario'
import Register from './Register'
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

export default function OffCanvas(props) {


    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)
    const showRegister = props.showRegister
    const setShowRegister = props.setShowRegister
    const showLogin = props.showLogin
    const setShowLogin = props.setShowLogin
    const auth = props.auth

    useEffect(() => {

        if (showRegister === true) {
            setRegister(true)
            setLogin(false)
        }

        if (showLogin === true) {
            setLogin(true)
            setRegister(false)
        }

        if (auth === true) {
            setShowRegister(false)
            setShowLogin(false)
        }

    }, [showRegister, showLogin, setShowRegister, setShowLogin, auth])

    return (<>

        <SwipeableDrawer
            anchor={'right'}
            open={props.showInterfaz}
        >
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <IconButton onClick={() => props.setShowInterfaz(false)} aria-label="delete">
                    <HighlightOffIcon />
                </IconButton>
            </Box>
            {
                <InterfazUsuario setShowInterfaz={props.setShowInterfaz} />
            }
        </SwipeableDrawer>

        <SwipeableDrawer
            anchor={'left'}
            open={props.showRegister || props.showLogin}
        >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => {
                    props.setShowRegister(false);
                    props.setShowLogin(false)
                }}
                    aria-label="delete"
                >
                    <HighlightOffIcon />
                </IconButton>
            </Box>
            {register ?
                <Register />
                : login &&
                <Login />
            }
        </SwipeableDrawer>

    </>)
}