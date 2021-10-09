import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material';
import { Button, TextField, Typography, Container, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useForm } from '../hooks/useForm'
import { fileUpload } from '../helpers/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { crearEmprendimientos } from '../actions/actionAddEmp';
import { useHistory } from 'react-router-dom'
import { actualizarAsincrono } from '../actions/actionUserEmp';

const date = new Date()


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


export default function EditEmprendimiento({ data, openModal, setOpenModal }) {
    
    


    const dispatch = useDispatch()
    const [images, setImages] = useState(data.imagenes);

    const [values, setValues, handleInputChange, reset] = useForm({
        nombre: data.nombre,
        descripcion: data.descripcion,
        categoria: data.categoria,
        imagenes: '',
        userId:data.userId,
        displayName: data.displayName,
        fotoPerfil: data.fotoPerfil,
        correo: data.correo,
        id: data.id,
    })

    let {nombre, descripcion, categoria, imagenes, userId, displayName, fotoPerfil, correo, id } = values





    const handleClickFiles = () => {
        document.querySelector('#inputFileChangerEdit').click()
    }

    const handleUploadImage = (e) => {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            fileUpload(file)
                .then(resp => {
                    images[i + (Object.keys(data.imagenes).length -1)] = resp
                    console.log(resp)
                    setValues({
                        ...values,
                        ['imagenes']: images
                    })
                }).catch(err => {
                    console.log(err.message)
                })
        }
    }

    console.log(id)




    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('funcion')
        dispatch(actualizarAsincrono(nombre, descripcion, categoria, imagenes, userId, displayName, fotoPerfil, correo, id))
        setOpenModal(false)


    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                    component="form"
                >
                    <AddBusinessIcon sx={{ fontSize: '60px', color: '#299ac1' }} />
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
                            name="nombre"
                            onChange={handleInputChange}
                            autoComplete={false}
                            autoFocus
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Descripción del emprendimiento"
                            multiline
                            minRows={8}
                            name="descripcion"
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />

                        <InputLabel id="categoria">Categorias</InputLabel>
                        <Select
                            labelId="categoria"
                            id="demo-simple-select"
                            value={values.categoria}
                            name="categoria"
                            onChange={handleInputChange}
                            fullWidth
                        >
                            <MenuItem value={'reparacion y mantenimiento'}>Reparacion y mantenimiento</MenuItem>
                            <MenuItem value={'tecnologia'}>Tecnologia</MenuItem>
                            <MenuItem value={'otros'}>Otros</MenuItem>
                        </Select>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <AddToPhotosIcon sx={{ color: '#299ac1', marginRight: '10px', fontSize: '35px' }} onClick={handleClickFiles} />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="text"
                                label="Seleccionar imagenes del emprendimiento"
                                autoComplete={false}
                                autoFocus
                                readOnly={true}
                                onClick={handleClickFiles}
                                value={`Has seleccionado ${Object.keys(imagenes).length} archivos`}
                                disabled
                            />
                            <input
                                type="file"
                                id='inputFileChangerEdit'
                                multiple
                                accept="image/*"
                                hidden
                                name="imagenes"
                                onChange={handleUploadImage}
                            />
                        </Box>

                        <Button
                            type="button"
                            variant="contained"
                            sx={{ marginBottom: 10 }}
                            onClick={handleSubmit}
                        >Publicar</Button>


                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    )
}

