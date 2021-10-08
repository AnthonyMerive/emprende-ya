import * as React from 'react';
import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import SellIcon from '@mui/icons-material/Sell';
import { useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { logout } from '../actions/actionLogin'
import { useDispatch } from 'react-redux';
import { resetRegister } from '../actions/actionRegister';
import { fileUpload } from '../helpers/FileUpload';
import { addFoto } from '../actions/addFoto'
import { IconButton } from '@mui/material';
import { resetMensajes } from '../actions/actionMensajes';
import { resetEmprendimientos } from '../actions/actionEmprendimiento';

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

export default function Usuario(props) {

    const perfil = useSelector(store => store.login)
    const nuevoUsuario = useSelector(store => store.register)

    const dispatch = useDispatch()

    const handleCerrarSesion = () => {
        dispatch(logout());
        dispatch(resetRegister())
        dispatch(resetEmprendimientos())
        dispatch(resetMensajes())
        props.setShowInterfaz(false)
        localStorage.clear();
    }

    const idPerfil = perfil.id;
    const idNuevoUsuario = nuevoUsuario.id;
    const fotoPerfil = perfil.foto;
    const [imgUrl, setImgUrl] = useState(fotoPerfil)

    useEffect(() => {
        if (fotoPerfil === null) {
            alert('cargue una foto de perfil')
        }
    }, [idPerfil, idNuevoUsuario, fotoPerfil])

    const handleActualizafoto = () => {
        document.getElementById('fileSelector').click();
    }

    const handleFileChanged = (e) => {
        const file = e.target.files[0];
        fileUpload(file)
            .then(resp => {
                setImgUrl(resp)
            })
            .catch(error => {
                console.log('Vuelva a cargar la imagen');
                console.log(error)
            })
    }

    useEffect(() => {
        dispatch(addFoto(imgUrl))
    }, [imgUrl, dispatch])

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
                        <Avatar alt={perfil.displayName} src={`${perfil.foto}`}
                            sx={{ width: 80, height: 80 }} />
                        :
                        <div>
                            <input
                                id="fileSelector"
                                type="file"
                                name="file"
                                style={{ display: 'none' }}
                                onChange={handleFileChanged}
                            />
                            <IconButton aria-label="actualizaFoto">
                                <AddPhotoAlternateIcon
                                    onClick={handleActualizafoto}
                                    sx={{
                                        fontSize: "60px",
                                        color: "#131921"
                                    }} />
                            </IconButton>
                        </div>
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
                                    {`${perfil.displayName}`}
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
                                endIcon={<SellIcon />}
                            >
                                <Link
                                    onClick={() => props.setShowInterfaz(false)}
                                    to="/agregarProducto"
                                    style={{ textDecoration: 'none', color: 'grey' }}
                                >
                                    Agregar Emprendimiento
                                </Link>

                            </Button>

                        </Grid>

                        <Grid container justifyContent="center">

                            <Button
                                onClick={handleCerrarSesion}
                                size="small"
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2
                                }}
                                endIcon={<LoginIcon />}
                            >
                                <Link
                                    to="/"
                                    style={{ textDecoration: 'none', color: 'white' }}
                                >
                                    cerrar sesion
                                </Link>
                            </Button>


                        </Grid>

                        <Grid container justifyContent="center"
                            sx={{
                                mt: 3,
                            }}>
                            <Grid item>
                                <Link to="/">
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

