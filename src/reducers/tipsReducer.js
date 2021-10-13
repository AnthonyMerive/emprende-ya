import { typesTips } from "../types/types"

const initialState = {
    userEmp: []
}

export const tipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesTips.mostrar:
            return {
                userEmp: action.payload
            }


        default:
            return state;
    }
}