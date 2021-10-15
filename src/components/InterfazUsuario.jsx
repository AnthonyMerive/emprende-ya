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
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
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
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import { resetLocation } from '../actions/interfazAction';
import { resetUserEmp } from '../actions/actionUserEmp';
import Swal from 'sweetalert2';

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
    const locacion = useSelector(store => store.location)
    const { location } = locacion
    const [setWatch, watch] = useCurrentLocation()

    console.log(watch)
    console.log(location)

    const dispatch = useDispatch()

    const handleCerrarSesion = () => {
        dispatch(logout());
        dispatch(resetRegister())
        dispatch(resetEmprendimientos())
        dispatch(resetMensajes())
        dispatch(resetUserEmp())
        dispatch(resetLocation())
        props.setShowInterfaz(false)
        props.setNotification(0)
        localStorage.clear();
    }

    const idPerfil = perfil.id;
    const idNuevoUsuario = nuevoUsuario.id;
    const fotoPerfil = perfil.foto;
    const [imgUrl, setImgUrl] = useState(fotoPerfil)

    useEffect(() => {
        if (fotoPerfil === null) {
            Swal.fire({
                icon: 'warning',
                title: 'Cargue una foto de perfil',
                showConfirmButton: true
              })
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
                Swal.fire({
                    icon: 'success',
                    title: `Su foto de perfil ha sido cargada`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: `${error}`,
                    showConfirmButton: false,
                    timer: 1500
                  })
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

                            {


                                location === 'error' ?
                                    <Grid item xs={12} sx={{ textAlign: 'center'}}>
                                        <Typography>No ha autorizado los permisos de ubicacion</Typography>
                                        <IconButton onClick={() => { setWatch(true) }}>
                                            <LocationOnOutlinedIcon />
                                            Verificar ubicacion
                                        </IconButton>
                                    </Grid>
                                    :
                                    <Grid item xs={12}>
                                        <Typography
                                            align='center'
                                            component="h2"
                                            variant="subtitle1">
                                            {`${location}`}
                                        </Typography>
                                    </Grid>
                            }



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
                                endIcon={<BusinessCenterIcon />}
                            >
                                <Link
                                    onClick={() => props.setShowInterfaz(false)}
                                    to="/misEmprendimientos"
                                    style={{ textDecoration: 'none', color: 'grey' }}
                                >
                                    Mis Emprendimientos
                                </Link>

                            </Button>

                        </Grid>
                        <Grid container justifyContent="center">
                            <Link
                                onClick={() => props.setShowInterfaz(false)}
                                to="/tips"
                                style={{ textDecoration: 'none', color: 'grey' }}
                            >
                                <Button
                                    size="small"
                                    type="submit"
                                    variant="outlined"
                                    sx={{
                                        mt: 3,
                                        color: '#7E8284'
                                    }}
                                    startIcon={<LightbulbTwoToneIcon />}
                                >

                                    Tips


                                </Button>
                            </Link>
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

