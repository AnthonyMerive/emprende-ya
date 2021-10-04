import { typesEmprendimiento } from "../types/types"


export const addEmpReducer = (state = {}, action) => {
    switch (action.type) {
        case typesEmprendimiento.agregar:
            return {
                emprendimiento: [action.payload]
            }

        default:
            return state;
    }
}
