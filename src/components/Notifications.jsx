import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { Typography, Box,  } from '@mui/material';
import Divider from '@mui/material/Divider';





export default function Notifications() {
    const user = useSelector(state => state.login)

    console.log(user)

    return (
        <Box>
            <Stack direction="row">
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:2 }}>
                    <Avatar alt={user.displayName} src={user.foto} sx={{ marginRight: 2 }} />
                    <Typography variant="body2">{user.displayName}</Typography>
                </Box>
            </Stack>
            <Typography variant="body1">{'Desea Contactarte por tu emprendimiento "Abejas"' }</Typography>
            <Typography variant="caption" sx={{ display: 'flex', justifyContent: 'flex-end' }}>{'Hace 2 minutos'}</Typography>
            <Divider />
        </Box>
    )
}
