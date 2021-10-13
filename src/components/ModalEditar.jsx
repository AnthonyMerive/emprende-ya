import React from 'react'
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import 'materialize-css/dist/css/materialize.min.css'
import EditEmprendimiento from './EditEmprendimiento'

export default function ModalEditar({ data, openModal, setOpenModal }) {

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
