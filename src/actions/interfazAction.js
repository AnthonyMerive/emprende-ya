import { typesInterfaz } from "../types/types"

export const guardarSincrono = (location) => {
    return {
        type: typesInterfaz.guardarLocacion,
        payload: location
    }
}

export const resetLocation = () => {
    return {
        type: typesInterfaz.reset,
        payload: []
    }
}

