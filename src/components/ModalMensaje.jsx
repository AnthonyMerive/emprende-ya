import { Avatar, Container, Divider, Modal, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'

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

    const mensajes = useSelector(store => store.Mensajes)
    const msjs = mensajes.mensajes

    const msj = msjs.find(msj=> (msj.id) === (props.id))

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
                            <Typography variant="h6" >{msj.nombreEnvia}  </Typography>
                            <Typography > ({msj.correoEnvia}) </Typography>
                        </Box>
                        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />

                        <Box sx={{ p: 2, wordWrap: 'break-word', textAling: 'center', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6">Titulo:{` ${msj.titulo}`}</Typography> <br />
                            <Typography variant="body1">Mensaje: {` ${msj.mensaje}`}</Typography>
                        </Box>


                    </Container>

                </Box>
            </Modal>


        </>)
}
