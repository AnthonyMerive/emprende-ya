import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Tooltip from '@mui/material/Tooltip';
import ModalDetalle from './ModalDetalle';
import moment from 'moment';
import 'moment/locale/es';
import AddIcon from '@mui/icons-material/Add';

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
    const [expanded, setExpanded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showEnviar, setShowEnviar] = useState(false);
    const [dataModal, setDataModal] = useState('')

    moment.locale('es');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleModal = () => {
        setOpenModal(true)
    }

    let avatar = ''
    avatar =
        <Tooltip title={`${data.displayName} `} placement="bottom-start">
            <Avatar alt={`${data.displayName} `} src={`${data.fotoPerfil}`}
                sx={{ width: 40, height: 40 }} />
        </Tooltip>

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
                        <IconButton onClick={handleModal} >
                            <AddIcon />
                        </IconButton>
                    </CardActions>
                </Card>

                <ModalDetalle openModal={openModal} setOpenModal={setOpenModal} imagen={data.imagenes} infoCard={data} ubicacion={data.ubicacion} />
            </Container>
        </ThemeProvider>
    );
}