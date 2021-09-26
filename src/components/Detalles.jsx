import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { stringAvatar } from '../hooks/colorUser';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Detalles() {
    const [expanded, setExpanded] = React.useState(false);

    const publicacion = {
        id: '123456',
        emprendimiento: 'Miel de abeja artesanal',
        detalles: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, minus. Sed officia odio deserunt, necessitatibus, magnam ullam tempore sint architecto, neque praesentium velit quo quas commodi corrupti qui eos quae.',
        fecha: '14-10-2021',
        usuario: {
            nombre: 'Ilan',
            apellido: 'Diaz',
            prefijo: '57',
            telefono: '3202312631',
            correo: 'ilan@gmail.com',
            foto: ''
        },
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let avatar = ''

    if (publicacion.usuario.foto !== '') {

        avatar = <Avatar alt={`${publicacion.usuario.nombre} ${publicacion.usuario.apellido}`} src={`${publicacion.usuario.foto}`}
            sx={{ width: 80, height: 80 }} />

    } else {

        avatar = <Avatar alt={`${publicacion.usuario.nombre} ${publicacion.usuario.apellido}`}

            {...stringAvatar(`${publicacion.usuario.nombre} ${publicacion.usuario.apellido}`)}

        />
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader

                avatar={avatar}

                action={
                    <IconButton aria-label="cerrar">
                        <CloseIcon />
                    </IconButton>
                }
                title={publicacion.emprendimiento}
                subheader={publicacion.fecha}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=400&fit=crop&auto=format"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}