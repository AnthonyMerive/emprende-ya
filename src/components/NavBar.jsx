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
import { Button, Popover } from '@mui/material';
import OffCanvas from './Offcanvas';

export default function NavBar(props) {

    const notification = 0
    const autenticacion = props.auth

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showInterfaz, setShowInterfaz] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Box>
                <AppBar position="fixed"
                    sx={{ boxShadow: 'none' }}
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
                                >
                                    <Tab value="one" label="Categoria uno" />
                                    <Tab value="two" label="Categoria dos" />
                                    <Tab value="three" label="Categoria tres" />
                                </Tabs>


                                <Tabs>
                                    {

                                        notification >= 1 ?


                                            <Tab icon={
                                                <Badge
                                                    onClick={handleClick}
                                                    badgeContent={notification} color="error" >
                                                    <NotificationsIcon sx={{ color: 'white' }} />
                                                </Badge>}
                                            />
                                            :
                                            <Tab icon={
                                                <Badge
                                                    onClick={handleClick}
                                                >
                                                    <NotificationsIcon sx={{ color: 'white' }} />
                                                </Badge>}
                                            />

                                    }
                                    <Tab icon={<HomeIcon sx={{ color: 'white' }} />} />
                                    <Tab onClick={() => setShowInterfaz(true)} icon={<AccountCircleIcon sx={{ color: 'white' }} />} />
                                </Tabs>
                            </Toolbar>

                            :

                            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                // sx={{ mr: 2 }}
                                >
                                    <MenuIcon />
                                </IconButton>


                                <Tabs >
                                    <Tab onClick={() => setShowLogin(true)} icon={<Button sx={{ color: 'white' }} variant="outlined">Login</Button>} />
                                    <Tab onClick={() => setShowRegister(true)} icon={<Button sx={{ color: 'white' }} variant="outlined">Registro</Button>} />

                                </Tabs>

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
                setShowInterfaz = {setShowInterfaz}
                showInterfaz = {showInterfaz}
                auth={autenticacion}
            />
        </div>
    )
}
