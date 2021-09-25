import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';


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


export default function AddEmprendimiento() {

    const handleClickFiles = () => {
        document.querySelector('#inputFileChanger').click()
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <AddBusinessIcon sx={{fontSize:'60px',color:'#299ac1'}}/>
                    <Typography component="h1" variant="h5">
                        Agrega un nuevo emprendimiento
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
                            label="Nombre del emprendimiento"
                            name="nombEmprend"
                            autoComplete={false}
                            autoFocus
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Descripción del emprendimiento"
                            multiline
                            minRows={8}
                            fullWidth
                            margin="normal"
                        />


                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <AddToPhotosIcon sx={{color:'#299ac1'}}/>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="text"
                                label="Seleccionar imagenes del emprendimiento"
                                name="nombEmprend"
                                autoComplete={false}
                                autoFocus
                                readOnly={true}
                                onClick={handleClickFiles}
                                value={'aqui va la url de la imagen cloudinary'}
                                disabled
                            />
                            <input
                                type="file"
                                id='inputFileChanger'
                                hidden
                            />
                        </Box>

                        <Button variant="contained">Publicar</Button>


                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
