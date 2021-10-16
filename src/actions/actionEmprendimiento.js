import { collection, getDocs, orderBy, query, } from "@firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { typesEmprendimiento } from '../types/types'

export const mostrarAsincronico = () => {
    return async (dispatch) => {
        const coleccion = collection(db, "Emprendimientos")
        const q = query(coleccion, orderBy("fechaCreacion", "desc"))
        const result = await getDocs(q)
        const emprendimientos = [];
        result.forEach((document) => {
            emprendimientos.push({
                id: document.id,
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

