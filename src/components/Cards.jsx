import React, { useEffect } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/material/';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mostrarAsincronico } from '../actions/actionEmprendimiento';
import { useSelector } from 'react-redux';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import Detalles from './Detalles'
import { mostrarMensajesAsincronico } from '../actions/actionMensajes';

export default function Cards() {

  const dispatch = useDispatch();
  const emprendimientos = useSelector(state => state.Emprendimientos)
  const perfil = useSelector(store => store.login)
  const id = perfil.uid
  const correo = perfil.correo
  const { emprendimiento } = emprendimientos



  useEffect(() => {
    if (id) {
      dispatch(mostrarAsincronico())
      dispatch(mostrarMensajesAsincronico(correo))
    }
  }, [dispatch,
    correo,
    id
  ])

  return (
    <Container>

      <Grid container spacing={2} >

        {
          emprendimiento.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}><Detalles data={data}/></Grid>
          ))
        }

      </Grid>

    </Container>
  );
}
