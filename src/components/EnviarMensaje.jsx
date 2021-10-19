import React, { useEffect, useState } from 'react'
import { Avatar, createTheme, ThemeProvider } from '@mui/material';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import { enviarMensajeAsincrono } from '../actions/actionMensajes';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { MailRounded } from '@mui/icons-material';


const theme = createTheme({
    palette: {
        primary: {
            light: '#2bc8c8',
            main: '#299ac1',
            dark: '#1a627d',
            contrastText: '#fff'
        }
    }
})

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function EnviarMensaje(props) {
    const user = useSelector(user => user.login)
    const id = user.uid
    let displayName = 'Un visitante';
    let fotoPerfil = 'https://res.cloudinary.com/df8qzqymf/image/upload/v1634614984/avatardefault_92824_gyu3tg.png'
    let correo = null
    // const displayName = user.displayName;
    // const fotoPerfil = user.foto;
    // const correo = user.correo;
    const date = new Date()

    if (id) {
        displayName = user.displayName;
        fotoPerfil = user.foto;
        correo = user.correo;
    }




    const dispatch = useDispatch()

    const [values, setValues, handleInputChange, reset] = useForm({
        nombreEnvia: displayName,
        fotoEnvia: fotoPerfil,
        correoEnvia: correo,
        nombreRecibe: props.displayName,
        fotoRecibe: props.foto,
        correoRecibe: props.correo,
        emprendimiento: props.emprendimiento,
        leido: false,
        fechaEnvio: date,
        titulo: '',
        mensaje: ''
    })

    const {
        nombreEnvia,
        fotoEnvia,
        correoEnvia,
        nombreRecibe,
        correoRecibe,
        fotoRecibe,
        titulo,
        mensaje,
        leido,
        emprendimiento,
        fechaEnvio } = values

    console.log(values)


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(enviarMensajeAsincrono(
            nombreEnvia,
            fotoEnvia,
            correoEnvia,
            nombreRecibe,
            fotoRecibe,
            correoRecibe,
            fechaEnvio,
            titulo,
            mensaje,
            leido,
            emprendimiento))

        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
        })
        props.setShowEnviar(false)
    }


    return (<>
        {
            id ?
                <ThemeProvider theme={theme}>
                    < Container component="main" maxWidth="md" >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                            component="form"
                        >
                            <Avatar sx={{ mb: 2 }} alt={`${props.displayName}`} src={`${props.foto}`} />

                            <Typography component="h1" variant="h6">
                                Contactar a {props.displayName}
                            </Typography>
                            <Box component="form" noValidate sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '80%',
                            }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="text"
                                    label="Titulo"
                                    name="titulo"
                                    onChange={handleInputChange}
                                    autoComplete={false}
                                    autoFocus
                                />
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Mensaje"
                                    multiline
                                    minRows={8}
                                    name="mensaje"
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                />

                                <Button
                                    type="button"
                                    variant="contained"
                                    sx={{ marginBottom: 10 }}
                                    onClick={handleSubmit}
                                >
                                    Enviar
                                </Button>


                            </Box >
                        </Box >
                    </Container >
                </ThemeProvider >

                :

                <ThemeProvider theme={theme} >
                    <Container component="main" maxWidth="md" >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            component="form"
                        >
                            <ErrorOutlineIcon sx={{ fontSize: "60px" }} />
                            <Typography sx={{ fontWeight: "bold", mt: 2, textAlign: "center", fontSize: "20px" }} component="h1" variant="h4">
                                Usted no esta Registrado
                            </Typography>

                            <Box component="form" noValidate sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '80%',
                            }}>
                                <Box sx={{ mt: 2, textAlign: "justify", fontSize: "14px" }}>
                                    <hr />
                                    <br />
                                    Si desea enviar un mensaje, deje informacion útil para que nuestro emprendedor {props.displayName} lo contacte.
                                    Recuerde que tambien puede contactarlo a traves del correo electronico <strong>{props.correo}</strong>.
                                </Box>

                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Mensaje"
                                    multiline
                                    minRows={8}
                                    name="mensaje"
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                />

                                <Button
                                    type="button"
                                    variant="contained"
                                    sx={{ marginBottom: 10 }}
                                    onClick={handleSubmit}
                                >
                                    Enviar
                                </Button>
                            </Box >
                        </Box>
                    </Container>
                </ThemeProvider>
        }

    </>)
}

