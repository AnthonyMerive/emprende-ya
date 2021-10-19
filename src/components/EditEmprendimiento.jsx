import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material';
import { Button, TextField, Typography, Container, Box, InputLabel, MenuItem, Select } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useForm } from '../hooks/useForm'
import { fileUpload } from '../helpers/FileUpload';
import { useDispatch } from 'react-redux';
import { actualizarAsincrono, mostrarAsincrono } from '../actions/actionUserEmp';

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
    const [agregarMas, setAgregarMas] = useState(false);
    const [reemplazar, setReemplazar] = useState(false);
    const [fullProgress, setFullProgress] = useState(100)
    const [progress, setProgress] = useState(0)
    const [values, setValues, handleInputChange, reset] = useForm({
        nombre: data.nombre,
        descripcion: data.descripcion,
        categoria: data.categoria,
        imagenes: images,
        userId: data.userId,
        displayName: data.displayName,
        fotoPerfil: data.fotoPerfil,
        correo: data.correo,
        id: data.id,
    })
    let { nombre, descripcion, categoria, imagenes, userId, displayName, fotoPerfil, correo, id } = values

    const handleClickFiles = () => {
        document.querySelector('#inputFileChangerEdit').click()
        setProgress(0)       
    }  

    const handleUploadImage = (e) => {
        const files = e.target.files       

        let length;
        if (Object.keys(data.imagenes).length <= 0) {
            length = 0
        } else {
            length = (Object.keys(data.imagenes).length - 1)
        }
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            fileUpload(file)
                .then(resp => {
                    images[i + length] = resp
                    // console.log(resp)
                    setValues({
                        ...values,
                        ['imagenes']: images
                    })
                    setProgress(prev => prev + 1 * 100 / files.length)
                    
                }).catch(err => {
                    console.log(err.message)
                })
        }
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            fileUpload(file)
                .then(resp => {
                    images[i] = resp
                    console.log(resp)
                    setValues({
                        ...values,
                        ['imagenes']: images
                    })
                    setProgress((((Object.values(images).length) * 100) / files.length).toFixed())
                }).catch(err => {
                    console.log(err.message)
                })
        }
    }

    const handleAgregarMas = () => {
        setAgregarMas(true)
        setReemplazar(false)
    }
    const handleReemplazar = () => {
        setAgregarMas(false)
        setReemplazar(true)
        setImages({})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        dispatch(actualizarAsincrono(nombre, descripcion, categoria, imagenes, userId, displayName, fotoPerfil, correo, id))
        setOpenModal(false)
        dispatch(mostrarAsincrono(correo))
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
                    <Typography component="h1" variant="h5"  sx={{fontFamily: "Nova Round"}}>
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
                            value={nombre}
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
                            value={descripcion}
                        />

                        <InputLabel id="categoria">Categorias</InputLabel>
                        <Select
                            labelId="categoria"
                            id="demo-simple-select"
                            value={categoria}
                            name="categoria"
                            onChange={handleInputChange}
                            fullWidth
                            disabled
                        >
                            <MenuItem value={'reparacion y mantenimiento'}>Reparacion y mantenimiento</MenuItem>
                            <MenuItem value={'tecnologia'}>Tecnologia</MenuItem>
                            <MenuItem value={'otros'}>Otros</MenuItem>
                        </Select>

                        <Box sx={{ m: 1 }}>
                            <Button onClick={handleAgregarMas}>Agregar mas imagenes</Button>
                            <Button onClick={handleReemplazar}>Reemplazar imagenes</Button>
                        </Box>

                        {agregarMas &&
                            <>
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
                                <Box sx={{ width: '100%', m: 2, textAlign: 'center' }}>
                                    <Typography  sx={{fontFamily: "Nova Round"}}>{`${progress}%`}</Typography>
                                    <progress max={fullProgress} value={progress}></progress>
                                </Box>
                            </>
                        }
                        {reemplazar &&
                            <>
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
                                        onChange={handleFileChange}
                                    />

                                </Box>
                                <Box sx={{ width: '100%', m: 2, textAlign: 'center' }}>
                                    <Typography  sx={{fontFamily: "Nova Round"}}>{`${progress}%`}</Typography>
                                    <progress max={fullProgress} value={progress}></progress>
                                </Box>
                            </>
                        }

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

