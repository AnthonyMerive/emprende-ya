import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebaseConfig";
import { typesEmprendimiento } from "../types/types"


export const crearEmprendimientos = (
    nombre,
    descripcion,
    categoria,
    imagenes,
    userId,
    displayName,
    fotoPerfil,
    correo) => {

    return async (dispatch) => {
        const newEmprendimientos = {
            nombre,
            descripcion,
            categoria,
            imagenes,
            userId,
            displayName,
            fotoPerfil,
            correo
        }
        addDoc(collection(db, "Emprendimientos"), newEmprendimientos)
            .then(resp => {
                dispatch(crear(newEmprendimientos))
                console.log(newEmprendimientos)
            })
            .catch(err => {
                console.log(err)
            })
    }
}



export const crear = (emprendimiento) => {
    return {
        type: typesEmprendimiento.agregar,
        payload: emprendimiento
    }
}