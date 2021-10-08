import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { stringAvatar } from '../hooks/colorUser';
import { Container, Divider, Grid } from '@mui/material';
import { Box, Button} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import ModalDetalle from './ModalDetalle';
import OffCanvas from './Offcanvas'
import moment from 'moment';
import 'moment/locale/es';

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

export default function Detalles({ data }) {
    const [expanded, setExpanded] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [dataImg, setDataImg] = React.useState('')
    const [showEnviar, setShowEnviar] = React.useState(false);

    moment.locale('es');

    console.log(moment(data.fechaCreacion.toDate()).calendar().charAt(0).toUpperCase())

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleModal = () =>{
        setOpenModal(true)
    }

    const handleCorreo = () =>{
        setShowEnviar(true)
    }

    let avatar = ''
    avatar =
        <Tooltip title={`${data.displayName} `} placement="bottom-start">
            <Avatar alt={`${data.displayName} `} src={`${data.fotoPerfil}`}
                sx={{ width: 40, height: 40 }} />
        </Tooltip>



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <ThemeProvider theme={theme}>
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

                        avatar={avatar}

                        title={<Typography variant="h6"><strong>{data.nombre}</strong></Typography>}
                        subheader={<Typography variant="caption" sx={{ color: '#CAC8C8'}}>{moment(data.fechaCreacion.toDate()).calendar()}</Typography>}
                    />

                    <CardMedia
                        component="img"
                        width="250"
                        height="250"
                        image={data.imagenes[0]}
                        alt={data.nombre}
                        sx={{objectFit:'contain', padding:2}}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {data.descripcion}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <Typography variant="body2" color="text.secondary">
                            Mas informacion
                        </Typography>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            onClick={handleModal}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>

                    {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Divider variant="middle" />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={2}>
                                    <Box>
                                        <IconButton aria-label="contactar" >
                                            <ChatIcon />
                                        </IconButton>


                                        
                                    </Box>
                                </Grid>

                                <Grid item xs={10}>
                                    <Box sx={{
                                        mt: 1
                                    }}>
                                        <Typography paragraph><strong>Contacto:</strong></Typography>
                                        <Typography paragraph>
                                            <strong>{data.displayName} </strong> ({data.correo})
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{
                                        mt: 1,
                                        display:'flex',
                                        justifyContent:'center'
                                    }}>
                                        <Button onClick={handleCorreo} variant="contained">Enviar Mensaje</Button>
                                        <Button variant="contained" onClick={handleModal}>Ver mas imagenes</Button>
                                    </Box>
                                </Grid>
                                
                            </Grid>
                        </CardContent>
                    </Collapse> */}
                </Card>

                <OffCanvas 
                displayName={data.displayName} 
                correo={data.correo} 
                foto={data.fotoPerfil}
                emprendimiento={data.nombre}
                setShowEnviar={setShowEnviar}
                showEnviar={showEnviar}
                />
                <ModalDetalle openModal={openModal} setOpenModal={setOpenModal} data={data.imagenes} infoCard={data}/>
            </Container>
        </ThemeProvider>
    );
}