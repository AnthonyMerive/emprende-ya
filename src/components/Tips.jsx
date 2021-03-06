import { Container, Box, Grid, Typography, Link, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import Carousel from 'react-elastic-carousel'
import youtube from '../helpers/youtube';
import { useDispatch, useSelector } from 'react-redux';
import {mostrarAsincrono} from '../actions/actionTips'


const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Tips = () => {
    const dispatch = useDispatch()
    const tipsFull = useSelector(store => store.tips)
    const { tips } = tipsFull
    const [value, setValue] = useState('tipsEmprendimiento');
    const [videos, setVideos] = useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(mostrarAsincrono())

        let carousel = document.querySelectorAll('.carousel');
        M.Carousel.init(carousel, {});

        getVideos()

    }, [])


    const getVideos = async () => {
        try {
            const response = await youtube.get('/search', {
                params: {
                    q: 'emprendimiento'
                }
            })
            setVideos(response.data.items)
        } catch (error) {
            console.log(error.message)
        }



    }

    console.log(tips)
    return (
        <>
            <Container sx={{ mt: '64px', textAlign: 'center' }}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img className="img_tips" src="https://res.cloudinary.com/duaokxfsp/image/upload/v1634070130/emprende-ya/Logo/EY_Tips_rnz7kj.png" alt="logo_eyTips" />
                </Box> */}



                <Grid container sx={{ mt: 2, width: '100%' }}>
                    <Grid item xs={12} >
                        <Item>
                            <Carousel /* itemPadding={[0, 10]} itemsToShow={1} outerSpacing={50} */>
                                {
                                    Object.values(videos).map((data, index) => (

                                        <iframe key={index} width="760" height="415" src={`https://www.youtube.com/embed/${data.id.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    ))
                                }


                            </Carousel>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Item>
                            <Carousel itemPadding={[0, 10]} itemsToShow={1} outerSpacing={10}>
                                {
                                    tips.map((data, index) => (
                                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{data.quote}</Typography>
                                            <Typography variant="subtitle1">{data.quoteContent}</Typography>
                                            <img src={data.image} alt="" style={{ width: '100%' }} />
                                        </Box>
                                    ))

                                }
                            </Carousel>

                        </Item>
                    </Grid>

                    <Grid item xs={12} md={4} sx={{display:'flex', alignItems:'center', flexDirection:'column', p:2}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color:'gray' }}>{'Cursos de emprendimiento gratuitos'}</Typography>
                        
                        {
                            [
                                {
                                    "nombrePag": "Udemy",
                                    "url": "https://www.udemy.com/courses/search/?price=price-free&q=emprendimiento&sort=relevance&src=ukw",
                                    "image": "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"


                                },
                                {
                                    "nombrePag": "Coursera",
                                    "url": "https://es.coursera.org/search?query=emprendimiento&utm_source=gg&utm_medium=sem&utm_campaign=95-BrandedSearch-Spanish-LATAM&utm_content=95-BrandedSearch-Spanish-LATAM&campaignid=12247707079&adgroupid=114147084941&device=c&keyword=cursos%20virtuales%20online&matchtype=b&network=g&devicemodel=&adpostion=&creativeid=496323226698&hide_mobile_promo=&gclid=Cj0KCQjw5JSLBhCxARIsAHgO2Se0A4olszXDj9cr9boYesw2l26j5oncruY0-t8S0LR_iLVoi74lv20aAoCiEALw_wcB",
                                    "image": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZpZXdCb3g9IjAgMCAxMTU1IDE2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiPjxwYXRoIGQ9Ik0xNTkuNzUgODEuNTRjMC00NC40OSAzNi42My04MC40NyA4Mi40My04MC40NyA0Ni4xMiAwIDgyLjc2IDM2IDgyLjc2IDgwLjQ3IDAgNDQuMTYtMzYuNjQgODAuOC04Mi43NiA4MC44LTQ1LjggMC04Mi40My0zNi42OC04Mi40My04MC44em0xMjUuNjEgMGMwLTIyLjI0LTE5LjMtNDEuODctNDMuMTgtNDEuODctMjMuNTUgMC00Mi44NSAxOS42My00Mi44NSA0MS44NyAwIDIyLjU3IDE5LjMgNDIuMiA0Mi44NSA0Mi4yIDIzLjkyIDAgNDMuMTgtMTkuNjMgNDMuMTgtNDIuMnptNzA1LjYzIDEuMzFjMC00OC43NCAzOS41OC04MS43OCA3NS41Ny04MS43OCAyNC41MyAwIDM4LjYgNy41MiA0OC4wOCAyMS45MmwzLjc3LTE5aDM2Ljc5djE1NS40aC0zNi43OWwtNC43NS0xNmMtMTAuNzkgMTEuNzgtMjQuMjEgMTktNDcuMSAxOS0zNS4zMy0uMDUtNzUuNTctMzEuMTMtNzUuNTctNzkuNTR6bTEyNS42MS0uMzNjLS4wOS0yMy41MjctMTkuNDctNDIuODM1LTQzLTQyLjgzNS0yMy41OSAwLTQzIDE5LjQxMS00MyA0M3YuMTY1YzAgMjEuNTkgMTkuMyA0MC44OSA0Mi44NiA0MC44OSAyMy44NSAwIDQzLjE0LTE5LjMgNDMuMTQtNDEuMjJ6TTk0NS43OCAyMlY0aC00MC4yM3YxNTUuMzloNDAuMjNWNzUuNjZjMC0yNS4xOSAxMi40NC0zOC4yNyAzNC0zOC4yNyAxLjQzIDAgMi43OS4xIDQuMTIuMjNMOTkxLjM2LjExYy0yMC45Ny4xMS0zNi4xNyA3LjMtNDUuNTggMjEuODl6bS00MDQuMjcuMDF2LTE4bC00MC4yMy4wOS4zNCAxNTUuMzcgNDAuMjMtLjA5LS4yMi04My43MmMtLjA2LTI1LjE4IDEyLjM1LTM4LjI5IDMzLjkzLTM4LjM0IDEuMzc2LjAwNCAyLjc1Mi4wODEgNC4xMi4yM0w1ODcuMSAwYy0yMSAuMTctMzYuMjIgNy4zOS00NS41OSAyMi4wMXpNMzM4Ljg4IDk5LjJWNC4wMWg0MC4yMlY5NC4zYzAgMTkuOTUgMTEuMTIgMzEuNzMgMzAuNDIgMzEuNzMgMjEuNTkgMCAzNC0xMy4wOSAzNC0zOC4yOFY0LjAxaDQwLjI0djE1NS4zOGgtNDAuMjF2LTE4Yy05LjQ4IDE0LjcyLTI0Ljg2IDIxLjkyLTQ2LjEyIDIxLjkyLTM1Ljk4LjAxLTU4LjU1LTI2LjE2LTU4LjU1LTY0LjExem0zOTEuNzQtMTcuNDhjLjA5LTQzLjUxIDMxLjIzLTgwLjc0IDgwLjYyLTgwLjY1IDQ1LjguMDkgNzguMTEgMzYuNzggNzggODAgLjAxIDQuMjczLS4zMyA4LjU0LTEgMTIuNzZsLTExOC40MS0uMjJjNC41NCAxOC42NSAxOS44OSAzMi4wOSA0My4xMiAzMi4xNCAxNC4wNiAwIDI5LjEyLTUuMTggMzguMy0xNi45NGwyNy40NCAyMmMtMTQuMTEgMTkuOTMtMzkgMzEuNjYtNjUuNDggMzEuNjEtNDYuNzUtLjE2LTgyLjY3LTM1LjIzLTgyLjU5LTgwLjd6bTExOC4xMi0xNi4xNGMtMi4yNi0xNS43LTE4LjU5LTI3Ljg0LTM3Ljg5LTI3Ljg3LTE4LjY1IDAtMzMuNzEgMTEuMDYtMzkuNjMgMjcuNzNsNzcuNTIuMTR6bS0yNjEuNCA1OS45NGwzNS43Ni0xOC43MmM1LjkxIDEyLjgxIDE3LjczIDIwLjM2IDM0LjQ4IDIwLjM2IDE1LjQzIDAgMjEuMzQtNC45MiAyMS4zNC0xMS44MiAwLTI1LTg0LjcxLTkuODUtODQuNzEtNjcgMC0zMS41MiAyNy41OC00OC4yNiA2MS43Mi00OC4yNiAyNS45NCAwIDQ4LjkyIDExLjQ5IDYxLjQgMzIuODNsLTM1LjQ0IDE4Ljc1Yy01LjI1LTEwLjUxLTE1LjEtMTYuNDItMjcuNTgtMTYuNDItMTIuMTQgMC0xOC4wNiA0LjI3LTE4LjA2IDExLjQ5IDAgMjQuMyA4NC43MSA4Ljg3IDg0LjcxIDY3IDAgMzAuMjEtMjQuNjIgNDguNTktNjQuMzUgNDguNTktMzMuODItLjAzLTU3LjQ2LTExLjE5LTY5LjI3LTM2Ljh6TTAgODEuNTRDMCAzNi43MyAzNi42My43NCA4Mi40My43NGMyNy45NDctLjE5NiA1NC4xODIgMTMuNzM3IDY5LjY3IDM3bC0zNC4zNCAxOS45MmE0Mi45NzIgNDIuOTcyIDAgMDAtMzUuMzMtMTguMzJjLTIzLjU1IDAtNDIuODUgMTkuNjMtNDIuODUgNDIuMiAwIDIyLjU3IDE5LjMgNDIuMiA0Mi44NSA0Mi4yYTQyLjUwMiA0Mi41MDIgMCAwMDM2LjMxLTIwbDM0IDIwLjI4Yy0xNS4zMDcgMjMuOTU1LTQxLjkwMiAzOC40MzEtNzAuMzMgMzguMjhDMzYuNjMgMTYyLjM0IDAgMTI1LjY2IDAgODEuNTR6IiBmaWxsPSIjMDA1NkQyIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4="


                                }
                            ].map((data, index) => (
                                <Link key={index} href={data.url} target="_blank" underline="none" sx={{ color: 'gray' }}>
                                    <Box sx={{ m: 2 }}>
                                        <img src={data.image} alt={data.nombrePag} style={{ width: '50%' }} />
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Cursos gratuitos de emprendimiento {data.nombrePag}</Typography>
                                        <Divider />

                                    </Box>
                                </Link>
                            ))

                        }

                    </Grid>
                </Grid>

            </Container>
        </>
    )
}
