import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux'
import { loginEmailPassword, loginGoogle } from '../actions/actionLogin'

//Funcion Copyright:

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

export default function Login(props) {

  const dispatch = useDispatch();

  const [values, setValues, handleInputChange, handleFileChange, reset] = useForm({
    email: '',
    password: ''
  })

  const { email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginEmailPassword(email, password))
    // reset();
  }

  const handleGoogle = () => {
    dispatch(loginGoogle(email, password))
  }

  const handleRegister = () => {
        props.setShowLogin(false)
        props.setShowRegister(true)
  }
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{
            m: 1,
            bgcolor: '#299ac1'
          }}
          >
            {/* incono */}
            <PersonIcon />

          </Avatar>

            <Typography sx={{fontFamily: "Nova Round"}} component="h1" variant="h5">
              LOGIN
            </Typography>

          <Box
            onSubmit={handleLogin}
            component="form"
            noValidate
            sx={{ mt: 1 }}
            autoComplete="off"
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleInputChange}
              autoFocus={true}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleGoogle}
              sx={{
                mt: 2,
                bgcolor: '#F36E6E'
              }}
              endIcon={<GoogleIcon />}
            >
              Ingresa con Google

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
              entrar

            </Button>

            <Grid container justifyContent="flex-end">
              <Link sx={{ cursor: "pointer" }} onClick={handleRegister}>
                {"¿No Tienes cuenta? Registrate"}
              </Link>
            </Grid>

          </Box>

        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />

      </Container>

    </ThemeProvider>
  );
}