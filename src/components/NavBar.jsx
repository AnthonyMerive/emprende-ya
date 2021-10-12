import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Button, Popover } from '@mui/material';
import OffCanvas from './Offcanvas';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Notifications from './Notifications'

export default function NavBar(props) {

    const perfil = useSelector(store => store.login)
    const mensajes = useSelector(store => store.Mensajes)
    const msj = mensajes.mensajes
    const autenticacion = props.auth

    let contador=0
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showInterfaz, setShowInterfaz] = useState(false)
    const [notification, setNotification] = useState(contador)

    const [anchorEl, setAnchorEl] = React.useState(null);   
   
    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {

        msj.map(msjs=>{
            if(!msjs.leido){
                contador++
            }
            setNotification(contador)
        })
        
    }, [msj, setNotification, contador])

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Box sx={{ backgroundColor: '', height: 55 }} >
                <AppBar
                    position="fixed"
                    sx={{ boxShadow: 'none' }}
                >
                 
                    {
                        autenticacion ?
                            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={()=>window.location.reload()}
                                >
                                    <img  className="logo"src="https://res.cloudinary.com/duaokxfsp/image/upload/v1633982365/emprende-ya/Logo/LogoEY2_ccjzin.png" alt="logoEY"/>
                                </IconButton>


                                <Box /* sx={{display:{xs:'none',md:'block'}}} */>
                                    {
                                        notification >= 1 ?
                                            <IconButton
                                                // size="large"
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{}}
                                                onClick={handleOpen}
                                            >
                                                <Badge
                                                    badgeContent={notification} color="error" >
                                                    <MailOutlineIcon sx={{ color: 'white' }} />
                                                </Badge>
                                            </IconButton>
                                            :
                                            <IconButton
                                                // size="large"
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{}}
                                                onClick={handleOpen}
                                            >
                                                <Badge>
                                                    <MailOutlineIcon sx={{ color: 'white' }} />
                                                </Badge>
                                            </IconButton>
                                    }
                                    <Link to="/"><IconButton><HomeIcon sx={{ color: 'white' }} /></IconButton></Link>

                                    {perfil.foto ?
                                        <IconButton onClick={() => setShowInterfaz(true)}><Avatar sx={{ width: 30, height: 30 }}  alt={perfil.displayName} src={`${perfil.foto}`} /></IconButton>
                                        :
                                        <IconButton onClick={() => setShowInterfaz(true)}><AccountCircleIcon sx={{ color: 'white' }} /></IconButton>
                                    }
                                </Box>
                            </Toolbar>

                            :

                            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Box>
                                    <IconButton
                                        // size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{}}
                                    >
                                         <img  className="logo"src="https://res.cloudinary.com/duaokxfsp/image/upload/v1633982365/emprende-ya/Logo/LogoEY2_ccjzin.png" alt="logoEY"/>
                                    </IconButton>
                                </Box>
                                <Box>

                                    <Button onClick={() => setShowLogin(true)} sx={{ color: 'white' }} variant="outlined">Login</Button>
                                    <Button onClick={() => setShowRegister(true)} sx={{ color: 'white' }} variant="outlined">Registro</Button>

                                </Box>
                            </Toolbar>
                    }

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Typography>
                            {
                                    mensajes.mensajes.length > 0 ?

                                    mensajes.mensajes.map(msj =>

                                        <Notifications
                                            id={msj.id}
                                            foto={msj.fotoEnvia}
                                            nombre={msj.nombreEnvia}
                                            emprendimiento={msj.emprendimiento}
                                            fechaEnvio={msj.fechaEnvio}
                                            leido={msj.leido}
                                        />
                                    )
                                    :
                                    <h5>Sin mensajes </h5>

                            }
                        </Typography>
                    </Popover>

                </AppBar>

            </Box>

            <OffCanvas
                setNotification = {setNotification}
                setShowLogin={setShowLogin}
                showLogin={showLogin}
                setShowRegister={setShowRegister}
                showRegister={showRegister}
                setShowInterfaz={setShowInterfaz}
                showInterfaz={showInterfaz}
                auth={autenticacion}
            />
        </>
    )
}
