import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { eliminarAsincrono, mostrarAsincrono } from '../actions/actionUserEmp';
import { Card, Container, Typography, Box, Button, Grid } from '@mui/material';
import moment from 'moment';
import 'moment/locale/es';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditEmprendimiento from './EditEmprendimiento';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function MisEmprendimientos() {
    const dispatch = useDispatch();
    const perfil = useSelector(store => store.login)
    const { correo, uid } = perfil

    const userEmp = useSelector(state => state.userEmp)

    const dataEmp = userEmp.userEmp
    const [openModal, setOpenModal] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);

    useEffect(() => {
        // if (correo) {
        dispatch(mostrarAsincrono(correo))
        // } 
        // dispatch(mostrarSincrono())
    }, [dispatch, correo, openModal])

    const handleDelete = (data) => {
        Swal.fire({
            icon: 'info',
            title: '¿Desea eliminar el emprendimiento?',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            // denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminarAsincrono(data.id))
                dispatch(mostrarAsincrono(correo))
                Swal.fire('¡Eliminado!', '', 'success')
            }
        })
    }

    const handleEdit = (data) => {
        setOpenModal(true)
        setDataEdit(data)
    }

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
        <Container sx={{ mt: 5 }}>

            <Typography variant="h4" sx={{fontFamily: "Nova Round",p: 2}} >Mis Emprendimientos</Typography>
            {dataEmp.length === 0 ?
                <Typography variant="h6" sx={{fontFamily: "Nova Round",p: 2}}>Sin emprendimientos, animate y publica uno dando <Link to="/agregarEmprendimiento">click aqui</Link></Typography>
                :
                dataEmp.map((data, index) => (

                    <>
                        <Box sx={{ marginBottom: 2 }}>
                            <Card key={index} sx={{fontFamily: "Nova Round",p: 2}} >
                                <Grid container>
                                    <Grid item xs={12} md={8}><Typography sx={{fontFamily: "Nova Round"}}>{data.nombre}</Typography></Grid>
                                    <Grid item xs={12} md={8}><Typography sx={{fontFamily: "Nova Round"}} variant="caption">{moment(data.fechaCreacion.toDate()).calendar().toUpperCase()}</Typography></Grid>
                                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                                        <Button variant="contained" onClick={() => { handleEdit(data) }}><EditRoundedIcon /></Button>
                                        <Button sx={{ ml: 1, bgcolor: "red" }} variant="contained" data={data} onClick={() => { handleDelete(data) }}><DeleteForeverRoundedIcon /></Button>
                                    </Grid>
                                    <Grid item xs={12} md={8} sx={{ wordWrap: 'break-word' }}>
                                        <Typography sx={{fontFamily: "Nova Round"}} variant="h6">Descripcion del emprendimiento:</Typography>
                                        <Typography sx={{fontFamily: "Nova Round"}} variant="body1">{data.descripcion}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Box>

                    </>
                ))

            }
            <Modal
                open={openModal}
                onClose={() => { setOpenModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <EditEmprendimiento data={dataEdit} openModal={openModal} setOpenModal={setOpenModal} />

                </Box>
            </Modal>
        </Container>
    )
}
