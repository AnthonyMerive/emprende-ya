import { Avatar, Button, Container, Divider, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { enviarMensajeAsincrono } from '../actions/actionMensajes';
import { useForm } from '../hooks/useForm';

export default function ModalMensaje(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', md: '60%', lg: '50%' }, height: 570,
        background: 'white',
        boxShadow: 24,
        p: 4,
        overflowY: 'scroll'

    };

    const user = useSelector(user => user.login)
    const mensajes = useSelector(store => store.Mensajes)
    const msjs = mensajes.mensajes
    const msj = msjs.find(msj => (msj.id) === (props.id))
    const displayName = user.displayName;
    const fotoPerfil = user.foto;
    const correo = user.correo;
    const dispatch = useDispatch();
    const date = new Date()

    const [values, setValues, handleInputChange, reset] = useForm({
        nombreEnvia: displayName,
        fotoEnvia: fotoPerfil,
        correoEnvia: correo,
        nombreRecibe: msj.nombreEnvia,
        fotoRecibe: msj.fotoEnvia,
        correoRecibe: msj.correoEnvia,
        emprendimiento: null,
        leido: false,
        fechaEnvio: date,
        titulo: msj.titulo,
        mensaje: ''
    })

    const {
        nombreEnvia,
        fotoEnvia,
        correoEnvia,
        nombreRecibe,
        correoRecibe,
        fotoRecibe,
        titulo,
        mensaje,
        leido,
        emprendimiento,
        fechaEnvio } = values

    const handleSubmit = () => {

        console.log('funcion')
        dispatch(enviarMensajeAsincrono(
            nombreEnvia,
            fotoEnvia,
            correoEnvia,
            nombreRecibe,
            fotoRecibe,
            correoRecibe,
            fechaEnvio,
            titulo,
            mensaje,
            leido,
            emprendimiento))
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
        })
        props.setAnchorEl(null)
        props.setOpenModal(false)

    }

    console.log(msj.correo)

    return (<>

        <Modal
            open={props.openModal}
            onClose={() => { props.setOpenModal(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Container>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
                        <Tooltip title={`${msj.nombreEnvia} `} placement="bottom-start">
                            <Avatar alt={`${msj.nombreEnvia} `} src={`${msj.fotoEnvia}`} sx={{ width: 40, height: 40, marginRight: 1 }} />
                        </Tooltip>
                        <Typography variant="h6" sx={{ fontFamily: "Nova Round" }}>{msj.nombreEnvia}  </Typography>
                        {msj.correoEnvia &&
                            <Typography sx={{ fontFamily: "Nova Round" }} > ({msj.correoEnvia}) </Typography>
                        }
                    </Box>
                    <Divider sx={{ marginBottom: 2, marginTop: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
                        <Typography sx={{ fontFamily: "Nova Round" }} variant="h6">{msj.titulo}</Typography> <br />
                        <Typography sx={{ fontFamily: "Nova Round" }} variant="body1">{msj.mensaje}</Typography>
                    </Box>

                </Container>
                {msj.correoEnvia ?
                    <Box>
                        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Responder el mensaje"
                            multiline
                            minRows={8}
                            name="mensaje"
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleSubmit}
                            >Enviar</Button>
                        </Box>
                    </Box>
                    :
                    <Box sx={{ mt: 2, textAlign: "justify", fontSize: "14px" }}>
                        <br />
                        El usuario que envio este mensaje no esta registrado, por tanto no puedes responderle.
                    </Box>
                }
            </Box>
        </Modal>


    </>)
}
