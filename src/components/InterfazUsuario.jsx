import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { stringAvatar } from '../hooks/colorUser'

const theme = createTheme({
    palette: {
        primary: {
            light: '#2bc8c8',
            main: '#299ac1',
            dark: '#1a627d',
            contrastText: '#fff',
        },
    },
});



export default function InterfazUsuario() {

    const perfil = {
        nombre: 'Ilan',
        apellido: 'Diaz',
        foto: 'https://mui.com/static/images/avatar/1.jpg',
        correo: 'ilan@gmail.com',
        prefijo: '57',
        telefono: '3202312631'
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography
                        component="h2"
                        variant="h5"
                        sx={{
                            mb: 4
                        }}>
                        Perfil
                    </Typography>


                    {perfil.foto ?
                        <Avatar alt={`${perfil.nombre} ${perfil.apellido}`} src={`${perfil.foto}`}
                            sx={{ width: 80, height: 80 }} />
                        :

                        <Avatar alt={`${perfil.nombre} ${perfil.apellido}`}

                            {...stringAvatar(`${perfil.nombre} ${perfil.apellido}`)}

                        />
                    }

                    <Box sx={{
                        mt: 1,

                    }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    align='center'
                                    component="h2"
                                    variant="h6">
                                    {`${perfil.nombre} ${perfil.apellido}`}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    align='center'
                                    component="h2"
                                    variant="subtitle1">
                                    {`${perfil.correo}`}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    align='center'
                                    component="h2"
                                    variant="subtitle1">
                                    {`+${perfil.prefijo} ${perfil.telefono}`}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid container justifyContent="center">
                            <Button
                                size="small"
                                type="submit"
                                variant="outlined"
                                sx={{
                                    mt: 3,
                                    color: '#7E8284'
                                }}
                                endIcon={<AutorenewIcon />}
                            >
                                actualizar perfil

                            </Button>

                        </Grid>

                        <Grid container justifyContent="center">
                            <Button
                                size="small"
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2
                                }}
                                endIcon={<LoginIcon />}
                            >
                                cerrar sesion

                            </Button>

                        </Grid>

                        <Grid container justifyContent="center"
                            sx={{
                                mt: 3,
                            }}>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    ¿Problemas con tu cuenta?
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>

            </Container >
        </ThemeProvider >
    );
}
