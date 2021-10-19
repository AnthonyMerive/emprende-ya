import { addDoc, collection, getDocs, where, query, doc, updateDoc, deleteDoc, orderBy } from "@firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { typesMensajes } from "../types/types";

export const enviarMensajeAsincrono = (
    nombreEnvia,
    fotoEnvia,
    correoEnvia,
    nombreRecibe,
    fotoRecibe,
    correoRecibe,
    fechaEnvio,
    titulo,
    mensaje,
    leido,
    emprendimiento) => {

    return async (dispatch) => {
        const newMensaje = {
            nombreEnvia,
            fotoEnvia,
            correoEnvia,
            nombreRecibe,
            fotoRecibe,
            correoRecibe,
            fechaEnvio,
            titulo,
            mensaje,
            leido,
            emprendimiento
        }
        addDoc(collection(db, "Mensajes"), newMensaje)
            .then(resp => {
                console.log(newMensaje)
            })
            .catch(err => {
                console.log(err)
            })
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
                id: document.id,
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

export const resetMensajes = () => {
    return {
        type: typesMensajes.reset,
        payload: []
    }
}

export const actualizarMensajeAsincrono = (estado, id) => {
    return async () => {
        // const updmsj = {
        //     leido: estado,
        // }
        console.log(estado, id)
        const docRef = await doc(db, `Mensajes`, `${id}`);

        await updateDoc(docRef, {
            leido: estado
        })
    }
}

export const eliminarMensajeAsincrono = (id) => {
    return  async () => {
        await deleteDoc(doc(db, `Mensajes`, `${id}`));
    }    
}




