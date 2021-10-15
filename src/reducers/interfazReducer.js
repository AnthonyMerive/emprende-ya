import { typesInterfaz } from "../types/types"


const initialState = {
    location: []
}

export const interfazReducer = (state = initialState, action) => {
    switch (action.type) {

        case typesInterfaz.guardarLocacion:
            return {
                location: action.payload
            }
        case typesInterfaz.reset:
            return {
                location: action.payload
            }

        default:
            return state;
    }
}