import { types } from '../types/types'
import { getAuth, updateProfile } from 'firebase/auth'

export const addFoto = (foto) => {

    return (dispatch) => {
        const auth = getAuth();

        updateProfile(auth.currentUser, {
            photoURL: foto
        }).then(() => {
            dispatch(actualizaLogin(foto))
        }).catch((error) => {
            console.log(error)
        });
    }
}

export const actualizaLogin = (pic) => {
    return {
        type: types.actualiza,
        payload: pic
    }
}