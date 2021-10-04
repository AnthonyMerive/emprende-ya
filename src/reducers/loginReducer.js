import { types } from "../types/types"

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:

            return {
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                foto: action.payload.foto,
                correo: action.payload.correo
            }

        case types.actualiza:
            return{
                ...state,
                foto: action.payload
            }

        case types.logout:
            return {

            }

        default:
            return state;
    }
}