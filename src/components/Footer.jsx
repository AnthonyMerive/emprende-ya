import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <div>
            <Box sx={{ mt: 5, borderTop: "solid 1px white", bgcolor: "#EAEAEA", color: "#5B5B5B" }}>
                <Container sx={{ mt: 3 }}>
                    <Grid sx={{ display: 'flex', textAlign: 'center', pb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Container sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Typography variant="h6" color="text.secondary" align="center">
                                    {'Copyright © '}
                                    <Link color="inherit" href="https://github.com/AnthonyMerive/emprende-ya">
                                        EmprendeYA
                                    </Link>{' '}
                                    {new Date().getFullYear()}
                                    {'.'}
                                </Typography>
 
                            </Container>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <FacebookIcon sx={{ cursor:"pointer", fontSize: "35px", ml: 1 }}/>
                                <TwitterIcon sx={{ cursor:"pointer", fontSize: "35px", ml: 1 }}/>
                                <InstagramIcon sx={{ cursor:"pointer", fontSize: "35px", ml: 1 }}/>
                                <GitHubIcon sx={{ cursor:"pointer", fontSize: "35px", ml: 1 }}/>
                                <LinkedInIcon sx={{ cursor:"pointer", fontSize: "35px", ml: 1 }}/>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}
