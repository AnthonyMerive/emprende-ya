import { collection, getDocs, } from "@firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { typesTips } from '../types/types'

export const mostrarAsincrono = () => {
    return async (dispatch) => {
        const datos = await getDocs(collection(db, "Tips"));
        const tips = [];
        datos.forEach((document) => {
            tips.push({
                id: document.id,
                ...document.data()
            })
        })
        dispatch(mostrarSincrono(tips))
    }
}

export const mostrarSincrono = (tips) => {
    return {
        type: typesTips.mostrar,
        payload: tips
    }
}