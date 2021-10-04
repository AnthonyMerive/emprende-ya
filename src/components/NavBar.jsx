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
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { Button, Popover } from '@mui/material';

export default function NavBar() {

    const notification = 0
    const autenticacion = true

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = React.useState('one');
    const [cate, setCate] = React.useState('one');

    const handleCateChange = (event, newValue) => {
        setCate(newValue);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                    <IconButton><HomeIcon sx={{ color: 'white' }} /></IconButton>
                                    <IconButton><AccountCircleIcon sx={{ color: 'white' }} /></IconButton>
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
                                    <Button sx={{ color: 'white' }} variant="outlined">Login</Button>
                                    <Button sx={{ color: 'white' }} variant="outlined">Registro</Button>
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
        </div>
    )
}
