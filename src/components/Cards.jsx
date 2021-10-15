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

export default function Cards() {
  const dispatch = useDispatch();
  const emprendimientos = useSelector(state => state.Emprendimientos)
  const perfil = useSelector(store => store.login)
  const id = perfil.uid
  const correo = perfil.correo
  const { emprendimiento } = emprendimientos

  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showEnviar, setShowEnviar] = useState(false);
  const [dataModal, setDataModal] = useState(null)

  moment.locale('es');


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleModal = (data) => {
    setOpenModal(true)
    setDataModal(data)
  }

  useEffect(() => {
    if(id){
      dispatch(mostrarAsincronico())
      dispatch(mostrarMensajesAsincronico(correo))
    }
  }, [dispatch,correo,id])

  return (
    <Container className="cardsGrid">

      <Grid container spacing={2} >

        {
          emprendimiento.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}><ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Card sx={{
                  maxWidth: 345,
                  marginTop: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>

                  <CardHeader

                    title={<Typography variant="h6"><strong>{data.nombre.toUpperCase()}</strong></Typography>}

                    subheader={<Typography variant="caption" sx={{ color: '#CAC8C8' }}>{moment(data.fechaCreacion.toDate()).calendar()}</Typography>}
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
  );
}
