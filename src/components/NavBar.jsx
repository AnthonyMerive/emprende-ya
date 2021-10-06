import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Avatar, Button, Popover } from '@mui/material';
import OffCanvas from './Offcanvas';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NavBar(props) {

    const perfil = useSelector(store => store.login)


    const notification = 0
    const autenticacion = props.auth

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showInterfaz, setShowInterfaz] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [value, setValue] = React.useState('one');
    const [cate, setCate] = React.useState('one');
    const handleCateChange = (event, newValue) => {
        setCate(newValue);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Box sx={{backgroundColor:'red', height:55}} >
                <AppBar
                    position="fixed"
                    sx={{ boxShadow: 'none'}}
                >
                    {/* duplicar toolbar */}
                    {
                        autenticacion ?
                            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                >
                                    <MenuIcon />
                                </IconButton>

                                <Tabs
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                    value={cate}
                                    onChange={handleCateChange}
                                >
                                    <Tab value="one" label="Categoria uno" />
                                    <Tab value="two" label="Categoria dos" />
                                    <Tab value="three" label="Categoria tres" />
                                </Tabs>

                                <Box>
                                    {
                                        notification >= 1 ?
                                            <IconButton
                                                // size="large"
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{}}
                                                onClick={handleClick}
                                            >
                                                <Badge
                                                    badgeContent={notification} color="error" >
                                                    <NotificationsIcon sx={{ color: 'white' }} />
                                                </Badge>
                                            </IconButton>
                                            :
                                            <IconButton
                                                // size="large"
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{}}
                                                onClick={handleClick}
                                            >
                                                <Badge>
                                                    <NotificationsIcon sx={{ color: 'white' }} />
                                                </Badge>
                                            </IconButton>
                                    }
                                    <Link to="/"><IconButton><HomeIcon sx={{ color: 'white' }} /></IconButton></Link>

                                    {perfil.foto ?
                                        <IconButton><Avatar sx={{ width: 30, height: 30 }} onClick={() => setShowInterfaz(true)} alt={perfil.displayName} src={`${perfil.foto}`}/></IconButton>
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
                                        <MenuIcon />
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
                        <Typography sx={{ p: 2 }}>AQUI VAN LAS NOTIFICACIONES</Typography>
                    </Popover>

                </AppBar>

            </Box>

            <OffCanvas
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
