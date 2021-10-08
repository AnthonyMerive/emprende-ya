import { collection, getDocs, } from "@firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import {typesEmprendimiento} from '../types/types'

export const mostrarAsincronico = () => {
    return async (dispatch) => {
        const datos = await getDocs(collection(db, "Emprendimientos"));
        const emprendimientos = [];
        datos.forEach((document) => {
            emprendimientos.push({
                    ...document.data()
            })
        })
        dispatch(mostrarSincrono(emprendimientos))
    }
}

export const mostrarSincrono = (emprendimientos) => {
    return {
        type: typesEmprendimiento.getEmprend,
        payload: emprendimientos
    }
}

export const resetEmprendimientos = () => {
    return {
        type: typesEmprendimiento.reset,
        payload: []
    }
}

