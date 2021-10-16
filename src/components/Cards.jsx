import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Container, Box } from '@mui/material/';
import { useDispatch } from 'react-redux';
import { mostrarAsincronico } from '../actions/actionEmprendimiento';
import { useSelector } from 'react-redux';
import Detalles from './Detalles'
import { mostrarMensajesAsincronico } from '../actions/actionMensajes';
import Modal from '@mui/material/Modal';
import ModalDetalle from './ModalDetalle';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import 'moment/locale/es';
import AddIcon from '@mui/icons-material/Add';
import OffCanvas from './Offcanvas'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useForm } from '../hooks/useForm'
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Cards() {
  const dispatch = useDispatch();
  let emprendimientos = useSelector(state => state.Emprendimientos.emprendimiento)
  const perfil = useSelector(store => store.login)
  const id = perfil.uid
  const correo = perfil.correo
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showEnviar, setShowEnviar] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [load, setLoad] = useState(false);
  const [busqueda, setBusqueda] = useState(null)
  const [buscar, setBuscar] = useState(null)

  let emprend = {}
  moment.locale('es');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [values, setValues, handleInputChange, reset] = useForm({
    categoria: 'ver todos',
  })

  const { categoria } = values

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

  if (categoria === 'ver todos' && emprendimientos.length > 0) {
    emprend = emprendimientos
  } else {
    emprend = emprendimientos.filter(data => data.categoria === categoria)
  }

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...emprend]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleBuscar = (e) => {
    e.preventDefault()
    setBuscar(emprendimientos.find(data => data.nombre.toLowerCase() === busqueda.nombre.toLowerCase()))
  }

  const handleModal = (data) => {
    setOpenModal(true)
    setDataModal(data)
  }

  return (
    <div className="gradient_layout">
      <Container className="cardsGrid ">
        {load &&
          <Grid container sx={{ pt: "5px" }}>
            <Grid item xs={4}>
              <InputLabel sx={{ ml: 3, color: "white" }} id="categoria">Filtrar por categorias:</InputLabel>
              <Select
                sx={{ ml: 3, bgcolor: "rgb(235, 235, 235)" }}
                labelId="categoria"
                id="demo-simple-select"
                value={values.categoria}
                name="categoria"
                onChange={handleInputChange}
              >
                <MenuItem value={'ver todos'}>Todos los emprendimientos</MenuItem>
                <MenuItem value={'reparacion y mantenimiento'}>Reparacion y mantenimiento</MenuItem>
                <MenuItem value={'tecnologia'}>Tecnologia</MenuItem>
                <MenuItem value={'otros'}>Otros</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={8}>
              <Box onSubmit={handleBuscar} component="form" sx={{ display: 'flex', justifyContent: 'end' }}>
                <Autocomplete
                  id="asynchronous-demo"
                  sx={{ width: 400, mr: 2 }}
                  open={open}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                  getOptionLabel={(option) => option.nombre}
                  options={options}
                  loading={loading}
                  onChange={(e, v) => setBusqueda(v)}
                  renderInput={(params) => (
                    <TextField
                      sx={{ bgcolor: "rgb(235, 235, 235)", ml: 3 }}
                      {...params}
                      label="Busqueda"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                <IconButton type="submit" sx={{ ml: 1, color: "white", fontSize: "40px" }} aria-label="delete" size="large">
                  <SearchIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

        }
        <Grid container spacing={2} >
          {buscar !== null ?
            <Grid item xs={12} sm={6} md={4} ><ThemeProvider theme={theme}>
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
                    title={<Typography variant="h6"><strong>{buscar.nombre.toUpperCase()}</strong></Typography>}
                    subheader={<Typography variant="caption">{moment(buscar.fechaCreacion.toDate()).calendar()}</Typography>}
                  />
                  <Typography variant="body2">{buscar.ubicacion}</Typography>
                  <CardMedia
                    component="img"
                    width="250"
                    height="250"
                    image={buscar.imagenes[0]}
                    alt={buscar.nombre}
                    sx={{ objectFit: 'contain', padding: 2 }}
                  />
                  <CardActions disableSpacing>
                    <Typography variant="body2" color="text.secondary">
                      Mas informacion
                    </Typography>
                    <IconButton onClick={() => { handleModal(busqueda) }} >
                      <AddIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Container>
            </ThemeProvider>
            </Grid>
            :
            emprend.length > 0 &&
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
        </Grid>
      </Container>
    </div>
  );
}
