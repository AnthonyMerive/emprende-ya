import { typesUserEmp } from "../types/types"

const initialState = {
    userEmp: []
}

export const userEmpReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesUserEmp.mostrar:
            return {
                userEmp: action.payload
            }
        case typesUserEmp.actualizar:
            return {
                userEmp: [...state.userEmp, action.payload]
            }
        case typesUserEmp.eliminar:
            return {
                userEmp: action.payload
            }
        case typesUserEmp.reset:
            return {
                userEmp: action.payload
            }


        default:
            return state;
    }
}