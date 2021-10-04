import { types } from "../types/types"

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            
            return{
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                telefono: action.payload.telefono,
                foto: action.payload.foto,
                auth: true
            }
    
        default:
            return state;
    }
}