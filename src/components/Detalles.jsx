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
import { Box } from '@mui/system';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';


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

export default function Detalles() {
    const [expanded, setExpanded] = React.useState(false);

    const publicacion = {
        id: '123456',
        emprendimiento: 'Miel de abeja artesanal',
        detalles: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, minus. Sed officia odio deserunt, necessitatibus, magnam ullam tempore sint architecto, neque praesentium velit quo quas commodi corrupti qui eos quae.',
        fecha: '14-10-2021',
        imagen: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=400&fit=crop&auto=format',
        usuario: {
            nombre: 'Ilan',
            apellido: 'Diaz',
            prefijo: '57',
            telefono: '3202312631',
            correo: 'ilan@gmail.com',
            foto: ''
        },
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let avatar = ''

    if (publicacion.usuario.foto !== '') {

        avatar =
            <Tooltip title={`${publicacion.usuario.nombre} ${publicacion.usuario.apellido}`} placement="bottom-start">
                <Avatar alt={`${publicacion.usuario.nombre} ${publicacion.usuario.apellido}`} src={`${publicacion.usuario.foto}`}
                    sx={{ width: 80, height: 80 }} />
            </Tooltip>

    } else {

        avatar =
            <Tooltip title={`${publicacion.usuario.nombre} ${publicacion.usuario.apellido}`} placement="bottom-start">
                <Avatar alt={`${publicacion.usuario.nombre} ${publicacion.usuario.apellido}`}

                    {...stringAvatar(`${publicacion.usuario.nombre} ${publicacion.usuario.apellido}`)}

                />
            </Tooltip>
    }

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

                        action={
                            <IconButton aria-label="cerrar">
                                <CloseIcon />
                            </IconButton>
                        }
                        title={<Typography variant="h6"><strong>{publicacion.emprendimiento}</strong></Typography>}
                        subheader={<Typography variant="body2" sx={{ color: '#CAC8C8' }}>Fecha: {publicacion.fecha}</Typography>}
                    />

                    <CardMedia
                        component="img"
                        height="194"
                        image={publicacion.imagen}
                        alt={publicacion.emprendimiento}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {publicacion.detalles}
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
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Divider variant="middle" />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={2}>
                                    <Box>
                                        <IconButton aria-label="contactar" >
                                            <ChatIcon />
                                        </IconButton>

                                        <IconButton aria-label="contactar" aria-describedby={id} onClick={handleClick}>
                                            <PhoneIcon />
                                        </IconButton>

                                        <Popper id={id} open={open} anchorEl={anchorEl}>
                                            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                                +{publicacion.usuario.prefijo} {publicacion.usuario.telefono}
                                            </Box>
                                        </Popper>
                                    </Box>
                                </Grid>

                                <Grid item xs={10}>
                                    <Box sx={{
                                        mt: 1
                                    }}>
                                        <Typography paragraph><strong>Contacto:</strong></Typography>
                                        <Typography paragraph>
                                            <strong>{publicacion.usuario.nombre} {publicacion.usuario.apellido}</strong> ({publicacion.usuario.correo})
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Collapse>
                </Card>
            </Container>
        </ThemeProvider>
    );
}