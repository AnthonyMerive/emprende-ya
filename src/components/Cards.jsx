import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Cards() {
    return (
        <Container>
            <Grid container spacing={2} sx={{ marginTop: 10,marginBottom: 5 }}>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="..."
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Ver más</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="..."
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Ver más</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="..."
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Ver más</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="..."
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Ver más</Button>
                        </CardActions>
                    </Card>
                </Grid>
                
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="..."
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Ver más</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="..."
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Ver más</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
