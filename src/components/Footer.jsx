import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';


export default function Footer() {
    return (
        <div>
            <Box>
                <Container sx={{marginBottom:3}}>
                    <Grid sx={{display:'flex', textAlign: 'center'}}>
                        <Grid item xs={12} md={4} borderRight={1}>
                            asd
                            <Divider/>
                            asd
                            
                        </Grid>

                        
                        
                        <Grid item xs={12} md={4}>
                            asd
                            
                        </Grid>

                        <Grid item xs={12} md={4}>
                            asd
                            
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}
