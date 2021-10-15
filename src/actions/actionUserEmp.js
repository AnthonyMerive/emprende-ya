import { addDoc, collection, getDocs, where, updateDoc, doc, deleteDoc, query } from "@firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { typesUserEmp } from "../types/types"


export const mostrarAsincrono = (correo) => {

    return async (dispatch) => {
        const coleccion = collection(db, "Emprendimientos")
        const q = query(coleccion, where("correo", "==", correo))
        const userEmp = await getDocs(q);
        const emprendimientos = [];
        userEmp.forEach((document) => {
            emprendimientos.push({
                id: document.id,
                ...document.data()
            })
        })
        dispatch(mostrarSincrono(emprendimientos))
    }
}


export const mostrarSincrono = (userEmp) => {
    return {
        type: typesUserEmp.mostrar,
        payload: userEmp
    }
}

export const actualizarAsincrono = (nombre, descripcion, categoria, imagenes, userId, displayName, fotoPerfil, correo, id) => {
    return async () => {
        const updEmp = {
            nombre: nombre,
            descripcion: descripcion,
            categoria: categoria,
            imagenes: imagenes,
            userId: userId,
            displayName: displayName,
            fotoPerfil: fotoPerfil,
            correo: correo,
            fechaCreacion: new Date()
        }
        console.log(updEmp)

        console.log(id)

        const docRef = await doc(db, `Emprendimientos`, `${id}`);

        await updateDoc(docRef, {
            nombre: nombre,
            descripcion: descripcion,
            categoria: categoria,
            imagenes: imagenes,
            userId: userId,
            displayName: displayName,
            fotoPerfil: fotoPerfil,
            correo: correo,
            fechaCreacion: new Date()
        })
    }
}


export const actualizarSincrono = (userEmp) => {
    return {    
        type: typesUserEmp.actualizar,
        payload: userEmp
    }
}

export const eliminarAsincrono = (id) => {
    return  async (dispatch,getState) => {
        await deleteDoc(doc(db, `Emprendimientos`, `${id}`));
    }    
}



export const eliminarSincrono = (userEmp) => {
    return {
        type: typesUserEmp.eliminar,
        payload: userEmp
    }
}

export const resetUserEmp = () => {
    return {
        type: typesUserEmp.reset,
        payload: []
    }
}