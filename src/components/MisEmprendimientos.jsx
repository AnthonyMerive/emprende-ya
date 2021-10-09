import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { mostrarSincrono } from '../actions/actionEmprendimiento';
import { eliminarAsincrono, mostrarAsincrono } from '../actions/actionUserEmp';
import { Card, Container, Typography, Box, Button, Grid } from '@mui/material';
import moment from 'moment';
import 'moment/locale/es';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ModalEditar from './ModalEditar';

export default function MisEmprendimientos() {
    const dispatch = useDispatch();
    const perfil = useSelector(store => store.login)
    const { correo, uid } = perfil

    const userEmp = useSelector(state => state.userEmp)

    const dataEmp = userEmp.userEmp
    const [openModal, setOpenModal] = React.useState(false);

    console.log(dataEmp)



    useEffect(() => {
        // if (correo) {
            dispatch(mostrarAsincrono(correo))
        // } 
        dispatch(mostrarSincrono())
    }, [dispatch, correo, openModal])

    const handleDelete = (data) => {
        dispatch(eliminarAsincrono(data.id))
        dispatch(mostrarAsincrono(correo))
        // console.log(data.id)
    }




    return (
        <Container sx={{ mt: 5 }}>

            <Typography variant="h4" sx={{ p: 2 }}>Mis Emprendimientos</Typography>
            {
                dataEmp.map((data, index) => (
                    // console.log(data.nombre)
                    <>
                        <Box sx={{ marginBottom: 2 }}>
                            <Card key={index} sx={{ p: 2 }} >
                                <Grid container>
                                    <Grid item xs={12} md={8}><Typography>{data.nombre}</Typography></Grid>
                                    <Grid item xs={12} md={8}><Typography variant="caption">{moment(data.fechaCreacion.toDate()).calendar().toUpperCase()}</Typography></Grid>
                                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                                        <Button variant="contained" onClick={() => { setOpenModal(true) }}><EditRoundedIcon /></Button>
                                        <Button variant="contained" data={data} onClick={() => { handleDelete(data) }}><DeleteForeverRoundedIcon /></Button>
                                    </Grid>
                                    <Grid item xs={12} md={8} sx={{ wordWrap: 'break-word' }}>
                                        <Typography variant="h6">Descripcion del emprendimiento:</Typography>
                                        <Typography variant="body1">{data.descripcion}</Typography>
                                    </Grid>
                                </Grid>
                                {/*  */}
                                {/*  */}
                            </Card>
                        </Box>
                        <ModalEditar data={data} openModal={openModal} setOpenModal={setOpenModal} />
                    </>
                ))
            }

        </Container>
    )
}
