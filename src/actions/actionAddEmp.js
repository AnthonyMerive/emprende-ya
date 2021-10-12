import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const crearEmprendimientos = (
    nombre,
    descripcion,
    categoria,
    imagenes,
    userId,
    displayName,
    fotoPerfil,
    correo,
    fechaCreacion,
    ubicacion) => {

    return async (dispatch) => {
        const newEmprendimientos = {
            nombre,
            descripcion,
            categoria,
            imagenes,
            userId,
            displayName,
            fotoPerfil,
            correo,
            fechaCreacion,
            ubicacion
        }
        addDoc(collection(db, "Emprendimientos"), newEmprendimientos)
            .then(resp => {
                console.log(newEmprendimientos)
            })
            .catch(err => {
                console.log(err)
            })
    }
}
