import { Grid } from '@mui/material'
import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

export default function AppRouter() {

    return (
        <>
            


            <Grid container>
                <Grid item xs={6}>
                    <Login />
                </Grid>

                <Grid item xs={6}>
                    <Register />
                </Grid>
            </Grid>
        </>
    )
}
