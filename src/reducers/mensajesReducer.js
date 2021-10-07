import { typesMensajes } from "../types/types"

const initialState = {
    mensajes: []
}

export const mensajesReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesMensajes.enviar:
            return {
                mensajes: [...state.mensajes, action.payload]
            }
        case typesMensajes.mostrar:
            return{
                mensajes: action.payload
            }
        

        default:
            return state;
    }
}