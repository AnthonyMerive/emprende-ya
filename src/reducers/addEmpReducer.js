import { typesEmprendimiento } from "../types/types"

const initialState = {
    emprendimiento: []
}

export const addEmpReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case typesEmprendimiento.agregar:
            return {
                emprendimiento: [...state.emprendimiento, action.payload]
            }
        case typesEmprendimiento.getEmprend:
            return {
                emprendimiento: action.payload
            }
        case typesEmprendimiento.reset:
            return {
                emprendimiento: action.payload
            }


        default:
            return state;
    }
}
