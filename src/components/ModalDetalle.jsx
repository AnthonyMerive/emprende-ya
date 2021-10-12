import React, { useEffect, useState } from 'react'
import { Box, Container, Tooltip, Avatar, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import CardMedia from '@mui/material/CardMedia';
import OffCanvas from './Offcanvas'

// { openModal, setOpenModal, data, infoCard }

export default function ModalDetalle(props) {
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

    const [currentImage, setCurrentImage] = useState('')
    const [showEnviar, setShowEnviar] = useState(false);


    useEffect(() => {
        // if (currentImage === '') {
            setCurrentImage(Object.values(props.imagen)[0])
        // } else {
            let imageAction = document.querySelectorAll('.materialboxed');
            M.Materialbox.init(imageAction, {});
        // }

    }, [currentImage,props.imagen])

    const handleEnviar = () =>{
        props.setOpenModal(!props.openModal)
        setShowEnviar(!showEnviar)
    }






    return (
        <>
            <Modal
                open={props.openModal}
                onClose={() => { props.setOpenModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CardMedia
                        component="img"
                        height="450"
                        image={currentImage}
                        alt="Paella dish"
                        sx={{ objectFit: 'contain', padding: 2 }}
                        className='materialboxed'
                    />
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>

                        {
                            Object.values(props.imagen).map((item, index) => (
                                <img key={index} width="70" src={item} onClick={() => { setCurrentImage(item) }} alt=""/>
                            ))
                        }
                    </Box>
                    <Divider sx={{ marginBottom: 2, marginTop: 2 }} />

                    <Container>


                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
                            <Tooltip title={`${props.infoCard.displayName} `} placement="bottom-start">
                                <Avatar alt={`${props.infoCard.displayName} `} src={`${props.infoCard.fotoPerfil}`} sx={{ width: 40, height: 40, marginRight: 1 }} />
                            </Tooltip>
                            <Typography variant="h6" >{props.infoCard.displayName}  </Typography>
                            <Typography > ({props.infoCard.correo}) </Typography>
                        </Box>
                        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
                        <Box sx={{ p: 2, wordWrap: 'break-word', textAling: 'center', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6">Descripcion del emprendimiento:</Typography> <br />
                            <Typography variant="body1">{props.infoCard.descripcion}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
                                <Button 
                                variant="outlined" 
                                sx={{ marginTop: 2, }}
                                onClick={handleEnviar}
                                >Contactar</Button>
                            </Box>
                        </Box>


                    </Container>

                </Box>
            </Modal>


            <OffCanvas
                displayName={props.infoCard.displayName}
                correo={props.infoCard.correo}
                foto={props.infoCard.fotoPerfil}
                emprendimiento={props.infoCard.nombre}
                setShowEnviar={setShowEnviar}
                showEnviar={showEnviar}
            />
        </>
    )
}
