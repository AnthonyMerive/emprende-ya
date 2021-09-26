import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export default function SidebarPerfil() {

    return (
        <div>
            <SwipeableDrawer
            anchor={'right'}
            open={true}
          >
            CONTENIDO PERFIL
          </SwipeableDrawer>
        </div>
    );
}
