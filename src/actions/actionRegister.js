import { types } from '../types/types'
import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'

export const registroEmailPasswordNombre = (name, email, password) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,
            email,
            password
        ).then(async ({ user }) => {

            await updateProfile(auth.currentUser, {
                displayName: name,
            })
   
            dispatch(registerSincrono(user.uid, user.displayName, user.email))

        }).catch(error => {
            console.log(error)
        })

    }
}


export const registerSincrono = (uid, displayName, email) => {
    return {
        type: types.register,
        payload: {
            uid,
            displayName,
            email,
        }
    }
}