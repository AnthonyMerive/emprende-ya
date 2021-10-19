import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Login from './Login'
import InterfazUsuario from './InterfazUsuario'
import Register from './Register'
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import EnviarMensaje from './EnviarMensaje';

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

    const handleClose = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        props.setShowRegister(open);
        props.setShowLogin(open)
        if (props.showInterfaz) { props.setShowInterfaz(open) }
        if (props.showEnviar) { props.setShowEnviar(open) }
        // props.setShowEnviar(open)
        // props.setShowInterfaz(open)
    };


    return (<>

        <SwipeableDrawer
            anchor={'right'}
            open={props.showInterfaz}
            onClose={handleClose(false)}
        >
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <IconButton onClick={() => props.setShowInterfaz(false)} aria-label="delete">
                    <HighlightOffIcon />
                </IconButton>
            </Box>
            {
                <InterfazUsuario setNotification={props.setNotification} setShowInterfaz={props.setShowInterfaz} />
            }
        </SwipeableDrawer>

        <SwipeableDrawer
            anchor={'left'}
            open={props.showEnviar}
        >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => props.setShowEnviar(false)} aria-label="delete">
                    <HighlightOffIcon />
                </IconButton>
            </Box>
            {
                <EnviarMensaje
                    displayName={props.displayName}
                    correo={props.correo}
                    foto={props.foto}
                    emprendimiento={props.emprendimiento}
                    setShowEnviar={props.setShowEnviar}
                />
            }
        </SwipeableDrawer>

        <SwipeableDrawer
            anchor={'left'}
            open={props.showRegister || props.showLogin}
            onClose={handleClose(false)}
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
                <Register setShowLogin={props.setShowLogin} setShowRegister={props.setShowRegister} />
                : login &&
                <Login setShowLogin={props.setShowLogin} setShowRegister={props.setShowRegister} />
            }
        </SwipeableDrawer>

    </>)
}
