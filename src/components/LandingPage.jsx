import React from 'react'
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Container, Box } from '@mui/material';
import { useTypewriter, Cursor } from 'react-simple-typewriter'


export default function LandingPage() {

    const { text } = useTypewriter({
        words: [' El emprendimiento que tanto buscabas', 
        'La oportunidad que tanto esperabas', 
        ' Todo al alcance un click'],
        loop: 0,
        deleteSpeed: 5,
        typeSpeed:10,
    })
    return (
        <>
            <div className="gradient-background">


                <Grid container spacing={2} sx={{ alignItems: 'center', marginTop: '-100px' }}>
                    <Grid item xs={12} md={6}>
                        <Container>
                            <Typography variant="h4" >
                   {text}
                                <Cursor />
                            </Typography>
                            <Button sx={{ marginRight: 2, marginTop: 2 }} variant="contained">Publica tu emprendimiento</Button>
                            <Button sx={{ marginRight: 2, marginTop: 2 }} variant="contained">Encuentra lo que buscas</Button>
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img className="img-landing" src="https://www.liderdelemprendimiento.com/wp-content/uploads/2021/04/Como-ser-emprendedor-y-no-morir-en-el-intento.png" alt="" />
                    </Grid>
                </Grid>
            </div>

            <Container>
                <Typography gutterBottom variant="h3" component="div" sx={{ marginBottom: -5 }}>
                    ¿Qué puedes hacer en emprendeYA?
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 10, marginBottom: 5 }}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CardMedia
                                component="img"
                                height="270"
                                image="https://www.portafolio.co/files/article_multimedia/uploads/2018/02/26/5a948341c51ad.jpeg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Encuentra ese emprendimiento que buscabas
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Desde plomeria hasta creación de páginas web, en emprendeYA lo encuentras todo.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="contained">Explorar</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{ minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                            <CardMedia
                                component="img"
                                height="270"
                                image="https://coworkingfy.com/wp-content/uploads/2020/04/emprendedores-felices-exitosos-1024x612.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Publica tu emprendimiento
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Da a conocer tu emprendimiento y logra impulsar tu proyecto

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="contained">Publicar un proyecto</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>

    )
}
