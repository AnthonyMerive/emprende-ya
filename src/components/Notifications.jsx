import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography, Box, IconButton, Grid, } from '@mui/material';
import Divider from '@mui/material/Divider';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarMensajeAsincrono, mostrarMensajesAsincronico, eliminarMensajeAsincrono } from '../actions/actionMensajes';
import ModalMensaje from './ModalMensaje';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';

export default function Notifications(props) {

    const dispatch = useDispatch();
    const perfil = useSelector(store => store.login)
    const correo = perfil.correo

    const [openModal, setOpenModal] = useState(false);

    const handleDetailLeido = () => {
        setOpenModal(true)
    }

    const handleDetailNoLeido = () => {
        dispatch(actualizarMensajeAsincrono(true, props.id))
        dispatch(mostrarMensajesAsincronico(correo))
        setOpenModal(true)

    }

    const handleDelete = () => {
        props.setAnchorEl(null);
        Swal.fire({
            icon: 'info',
            title: '¿Desea eliminar el mensaje?',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            // denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminarMensajeAsincrono(props.id))
                Swal.fire('¡Borrado!', '', 'success')
            }
        })
    }

    useEffect(() => {
        dispatch(mostrarMensajesAsincronico(correo))
    }, [])

    return (<>
        {props.leido ?
            <Box
                sx={{ p: 2, cursor: "pointer" }}
            >
                <Grid container
                >
                    <Grid item xs={10} onClick={handleDetailLeido}>
                        <Stack direction="row">
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <Avatar alt={props.nombre} src={props.foto} sx={{ marginRight: 2 }} />
                                <Typography variant="body2">{props.nombre}</Typography>
                            </Box>
                        </Stack>
                        {props.emprendimiento !== null ?
                            <Typography variant="body1">{`Desea contactarte por tu emprendimiento "${props.emprendimiento}"`}</Typography>
                            :
                            <Typography variant="body1">{"Respondió tu mensaje"}</Typography>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="body1">{"Borrar"}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <IconButton
                                aria-label="Example"
                                onClick={handleDelete}
                            >
                                <DeleteForeverIcon sx={{ fontSize: "35px", color: "#F71E1E" }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="caption" sx={{ display: 'flex', justifyContent: 'flex-end' }}>Recibido {moment(props.fechaEnvio.toDate()).calendar()}</Typography>

            </Box>
            :
            <Box
                sx={{ bgcolor: "#E2F0FA", p: 2, cursor: "pointer" }}
                onClick={handleDetailNoLeido}
            >
                <Stack direction="row">
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Avatar alt={props.nombre} src={props.foto} sx={{ marginRight: 2 }} />
                        <Typography variant="body2">{props.nombre}</Typography>
                    </Box>
                </Stack>
                {props.emprendimiento !== null ?
                    <Typography variant="body1">{`Desea contactarte por tu emprendimiento "${props.emprendimiento}"`}</Typography>
                    :
                    <Typography variant="body1">{"Respondió tu mensaje"}</Typography>
                }
                <Typography variant="caption" sx={{ display: 'flex', justifyContent: 'flex-end' }}>{moment(props.fechaEnvio.toDate()).calendar()}</Typography>
            </Box>
        }
        <Divider />

        <ModalMensaje
            id={props.id}
            openModal={openModal}
            setOpenModal={setOpenModal}
            setAnchorEl={props.setAnchorEl}
        />
    </>)
}
