import React from 'react'
import { Avatar, createTheme, ThemeProvider } from '@mui/material';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import { enviarMensajeAsincrono } from '../actions/actionMensajes';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';


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
    const displayName = user.displayName;
    const fotoPerfil = user.foto;
    const correo = user.correo;
    const date = new Date()



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


    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="md" >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                    component="form"
                // onSubmit={handleSubmit}
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


                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

