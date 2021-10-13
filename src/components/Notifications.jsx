import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography, Box, } from '@mui/material';
import Divider from '@mui/material/Divider';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarMensajeAsincrono, mostrarMensajesAsincronico } from '../actions/actionMensajes';
import ModalMensaje from './ModalMensaje';


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



    return (<>
        {props.leido ?
            <Box
                sx={{ p: 2, cursor: "pointer" }}
                onClick={handleDetailLeido}
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
        />
    </>)
}
