import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Container, Box } from '@mui/material/';
import { useDispatch } from 'react-redux';
import { mostrarAsincronico } from '../actions/actionEmprendimiento';
import { useSelector } from 'react-redux';
import { mostrarMensajesAsincronico } from '../actions/actionMensajes';
import Modal from '@mui/material/Modal';
import ModalDetalle from './ModalDetalle';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import moment from 'moment';
import 'moment/locale/es';
import AddIcon from '@mui/icons-material/Add';
import OffCanvas from './Offcanvas'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useForm } from '../hooks/useForm'
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { letterSpacing } from '@material-ui/system';


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

export default function Cards() {
  const dispatch = useDispatch();
  let emprendimientos = useSelector(state => state.Emprendimientos.emprendimiento)
  const perfil = useSelector(store => store.login)
  const id = perfil.uid
  const correo = perfil.correo
  const [openModal, setOpenModal] = useState(false);
  const [showEnviar, setShowEnviar] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [load, setLoad] = useState(false);
  const [emprend, setEmprend] = useState({})
  const [busqueda, setBusqueda] = useState(false)
  moment.locale('es');


  const [values, setValues, handleInputChange, reset] = useForm({
    categoria: 'ver todos',
    buscar: ''
  })

  const { categoria, buscar } = values

  useEffect(() => {
    if (id) {
      dispatch(mostrarAsincronico())
      dispatch(mostrarMensajesAsincronico(correo))
    }

  }, [dispatch, correo, id])

  useEffect(() => {
    if (emprendimientos.length > 0) {
      setLoad(true)
    }
  }, [emprendimientos])

  useEffect(() => {
    if (categoria === 'ver todos' && emprendimientos.length > 0 && buscar === '') {
      setEmprend(emprendimientos)
    } else if (categoria !== 'ver todos' && buscar === '') {
      setEmprend(emprendimientos.filter(data => data.categoria === categoria))
    }
  }, [categoria, emprendimientos, buscar])


  const handleBuscar = (e) => {
    e.preventDefault()
    if(buscar === ''){
      window.location.reload() 
    }else{
    setEmprend(emprendimientos.filter(data => data.nombre.toLowerCase() === buscar.toLowerCase()))
    setBusqueda(true)
    }
  }

  const handleModal = (data) => {
    setOpenModal(true)
    setDataModal(data)
  }

  return (
    <div className="gradient_layout">
      <Container className="cardsGrid ">
        {load &&
          <Grid container sx={{ pt: "12px" }}>
            <Grid container item xs={12} md={4}>
              <InputLabel sx={{ mr: 2, color: "white" }} id="categoria">Filtrar por categorias:</InputLabel>
              <Select
                sx={{ mr: 2, bgcolor: "rgb(235, 235, 235)" }}
                labelId="categoria"
                id="demo-simple-select"
                value={values.categoria}
                name="categoria"
                onChange={handleInputChange}
                fullWidth
              >
                <MenuItem value={'ver todos'}>Todos los emprendimientos</MenuItem>
                <MenuItem value={'reparacion y mantenimiento'}>Reparacion y mantenimiento</MenuItem>
                <MenuItem value={'tecnologia'}>Tecnologia</MenuItem>
                <MenuItem value={'otros'}>Otros</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box onSubmit={handleBuscar} component="form" sx={{ display: 'flex', justifyContent: 'center', ml: { md: 40 }, mt: { md: 0.5 } }}>
                <TextField
                  sx={{ bgcolor: "rgb(235, 235, 235)" }}
                  margin="normal"
                  fullWidth
                  id="buscar"
                  label="Buscar por nombre del emprendimiento"
                  name="buscar"
                  autoComplete="buscar"
                  value={buscar}
                  onChange={handleInputChange}
                  autoFocus={false}
                />
                <IconButton type="submit" sx={{ ml: 1, color: "white", fontSize: "40px" }} aria-label="delete" size="large">
                  <SearchIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

        }
        <Grid container spacing={2} >
          {
            emprend.length > 0 ?
              emprend.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}><ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Card
                      sx={{
                        maxWidth: 345,
                        minHeight: 420,
                        maxHeight: 420,
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}
                      className="cards"
                    >
                      <CardHeader
                        sx={{ textAlign: 'center', }}
                        title={<Typography variant="h6"><strong>{data.nombre.toUpperCase()}</strong></Typography>}
                        subheader={<Typography variant="caption">{moment(data.fechaCreacion.toDate()).calendar()}</Typography>}
                      />
                      <Typography variant="body2">{data.ubicacion}</Typography>
                      <CardMedia
                        component="img"
                        width="250"
                        height="250"
                        image={data.imagenes[0]}
                        alt={data.nombre}
                        sx={{ objectFit: 'contain', padding: 2 }}
                      />
                      <CardActions disableSpacing>
                        <Typography variant="body2" color="text.secondary">
                          Mas informacion
                        </Typography>
                        <IconButton onClick={() => { handleModal(data) }} >
                          <AddIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Container>
                </ThemeProvider>
                </Grid>
              ))
              :
              <Box sx={{ fontSize: '50px', color: 'grey.500', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} spacing={2} direction="row">
                <img style={{ width: '30%' }} className="" src="https://res.cloudinary.com/duaokxfsp/image/upload/v1634148880/emprende-ya/Logo/LogoEY4_q4blu4.png" alt="logoEY" />
                {busqueda ?
                  <Typography sx={{display: 'flex', justifyContent: 'center', flexDirection: "column", mt:5 }} variant="h4" color="text.secondary">
                    Sin coincidencias <br /><IconButton onClick={() => { window.location.reload() }} ><Typography variant="h4" color="#1976d29d">Regresar <ExitToAppIcon /> </Typography></IconButton>
                  </Typography>
                  :
                  <CircularProgress />
                }
              </Box>

          }
          <Modal
            open={openModal}
            onClose={() => { setOpenModal(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box >
              <ModalDetalle data={dataModal} openModal={openModal} setOpenModal={setOpenModal} setShowEnviar={setShowEnviar} />
            </Box>
          </Modal>
          {
            showEnviar && <OffCanvas
              displayName={dataModal.displayName}
              correo={dataModal.correo}
              foto={dataModal.fotoPerfil}
              emprendimiento={dataModal.nombre}
              setShowEnviar={setShowEnviar}
              showEnviar={showEnviar}
            />
          }
        </Grid >
      </Container >
    </div >
  );
}
