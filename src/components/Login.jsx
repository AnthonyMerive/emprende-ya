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

//---------------------------

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

export default function Login() {

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

          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Grid container justifyContent="flex-end">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
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

            <Grid container>

              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvido su contraseña?
                </Link>
              </Grid>

              <Grid item>
                <Link href="#" variant="body2">
                  {"¿No tienes cuenta? Registrate"}
                </Link>
              </Grid>

            </Grid>

          </Box>

        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />

      </Container>

    </ThemeProvider>
  );
}