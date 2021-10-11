import React, { useEffect, useState } from 'react'
import { Box, Grid, Container, Tooltip, Avatar, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import EditEmprendimiento from './EditEmprendimiento'

export default function ModalEditar({ data, openModal, setOpenModal }) {

    console.log(data)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', md: '60%', lg: '50%' }, height: 570,
        background: 'white',
        boxShadow: 24,
        overflowY: 'scroll'

    };

    return (
        <>
            <Modal
                open={openModal}
                onClose={() => { setOpenModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <EditEmprendimiento data={data} openModal={openModal} setOpenModal={setOpenModal}/>

                </Box>
            </Modal>


        </>
    )
}
