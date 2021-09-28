import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux'
import { registerSincrono } from '../actions/actionRegister'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/AnthonyMerive/emprende-ya">
                EmprendeYA
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

export default function Register() {

    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        email: '',
        password: '',
        nombreCompleto: '',
        telefono: ''
    })

    const { email, password, nombreCompleto, telefono } = values;

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerSincrono(nombreCompleto, email, password, telefono))
        reset();
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: '#299ac1'
                        }}>
                        <AddReactionIcon />
                    </Avatar>

                    <Typography
                        component="h1"
                        variant="h5">
                        REGISTRO
                    </Typography>

                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 3 }}
                        onSubmit={handleRegister}
                    >

                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="nombreCompleto"
                                    value={nombreCompleto}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre Completo"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electronico"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    autoComplete="email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="telefono"
                                    value={telefono}
                                    onChange={handleInputChange}
                                    label="Telefono Celular"
                                    type="text"
                                    id="telefono"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                bgcolor: '#F36E6E'
                            }}
                            endIcon={<GoogleIcon />}
                        >
                            Registrate con Google

                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                mb: 2
                            }}
                            endIcon={<LoginIcon />}
                        >
                            Enviar

                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    ¿Ya tienes una cuenta? Ingresa
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}