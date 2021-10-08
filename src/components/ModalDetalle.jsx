import React, { useEffect, useState } from 'react'
import { Box, Grid, Container, Tooltip, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';



export default function ModalDetalle({ openModal, setOpenModal, data, infoCard }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto', height: 570,
        background: 'white',
        boxShadow: 24,
        p: 4,
        overflowY: 'scroll'

    };

    const [currentImage, setCurrentImage] = useState('')

    useEffect(() => {
        if (currentImage === '') {
            setCurrentImage(Object.values(data)[0])
        } else {
            let imageAction = document.querySelectorAll('.materialboxed');
            M.Materialbox.init(imageAction, {});
        }

    }, [currentImage])




    return (
        <>
            <Modal
                open={openModal}
                onClose={() => { setOpenModal(false) }}
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
                            Object.values(data).map((item, index) => (
                                <img width="70" src={item} onClick={() => { setCurrentImage(item) }} />
                            ))
                        }
                    </Box>

                    <Container>
                        {/* 
                             sx={{ display: 'flex', justifyContent: 'flex-end', marginTop:1 }}>
                               

                            </Grid>
                            <Grid item xs={8} sx={{  }}>
                            
                            </Grid>
                        </Grid> */}

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Box>
                                <Tooltip title={`${infoCard.displayName} `} placement="bottom-start">
                                    <Avatar alt={`${infoCard.displayName} `} src={`${infoCard.fotoPerfil}`} sx={{ width: 40, height: 40, marginRight: 1 }} />
                                </Tooltip>
                            </Box>
                            <Box>
                                <Typography variant="h6" >{infoCard.displayName}  </Typography>
                                <Typography > ({infoCard.correo}) </Typography>
                            </Box>
                        </Box>
                        <div style={{ backgroundColor: 'red', maxWidth: 100 }}>
                            
                        </div>
                    </Container>



                    {/* <Grid container spacing={0} sx={{marginTop:1}}>
                        <Grid item xs={2}>
                            
                        </Grid>

                        <Grid item xs={10}>
                            <Box sx={{
                                mt: 1
                            }}>
                                
                                
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" color="text.secondary">
                                {infoCard.descripcion}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{
                                mt: 1,
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Button variant="contained">Enviar Mensaje</Button>
                            </Box>
                        </Grid>


                    </Grid> */}


                </Box>
            </Modal>
        </>
    )
}
