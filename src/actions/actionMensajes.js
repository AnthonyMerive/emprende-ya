import { addDoc, collection, getDocs, where, updateDoc, doc, deleteDoc, query } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebaseConfig";
import { typesMensajes } from "../types/types"

export const enviarMensajeAsincrono = (
    nombreEnvia,
    fotoEnvia,
    correoEnvia,
    nombreRecibe,
    fotoRecibe,
    correoRecibe,
    // fechaEnvio,
    titulo,
    mensaje) => {

    return async (dispatch) => {
        const newMensaje = {
            nombreEnvia,
            fotoEnvia,
            correoEnvia,
            nombreRecibe,
            fotoRecibe,
            correoRecibe,
            // fechaEnvio,
            titulo,
            mensaje
        }
        addDoc(collection(db, "Mensajes"), newMensaje)
            .then(resp => {
                dispatch(enviarMensajeSincrono(newMensaje))
                console.log(newMensaje)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const enviarMensajeSincrono = (mensaje) => {
    return {
        type: typesMensajes.enviar,
        payload: mensaje
    }
}

export const mostrarMensajesAsincronico = (correo) => {
    return async (dispatch) => {
        const coleccion = collection(db, "Mensajes")
        const q = query(coleccion, where("correoRecibe", "==", correo))
        const result = await getDocs(q)
        const mensajes = [];
        result.forEach((document) => {
            mensajes.push({
                ...document.data()
            })
        })
        dispatch(mostrarMensajesSincrono(mensajes))
    }
}

export const mostrarMensajesSincrono = (mensajes) => {
    return {
        type: typesMensajes.mostrar,
        payload: mensajes
    }
}





