import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useHistory} from 'react-router-dom'

export default function BotonAddEmp() {

    const history = useHistory()

    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 120,
        left: 'auto',
        position: 'fixed',
    };

    const handleEmprendimiento = () => {
        history.replace('/agregarEmprendimiento')
    }
    
    return (<>

            <Fab
                style={style}
                color="primary"
                aria-label="add"
                onClick={handleEmprendimiento}
                >
                <AddIcon />
            </Fab>

    </>)
}
