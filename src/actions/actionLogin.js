import { types } from '../types/types'
import { getAuth, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { googleAuth } from '../firebase/firebaseConfig'
import Swal from 'sweetalert2';

const auth = getAuth();

export const loginGoogle = () => {
    return (dispatch) => {
        signInWithPopup(
            auth,
            googleAuth
        )
            .then(({ user }) => {
                console.log(user)
                console.log(user.providerData[0])
                const data = user.providerData[0];
                dispatch(loginSincrono(user.uid, data.displayName, data.photoURL, data.email))
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: `${error}`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
    }
}

export const loginEmailPassword = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth,
            email,
            password
        ).then(({ user }) => {
            console.log(user)
            console.log(user.providerData[0])
            const data = user.providerData[0];
            dispatch(loginSincrono(user.uid, data.displayName, data.photoURL, data.email))
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: `${error}`,
                showConfirmButton: false,
                timer: 1500
              })
        })
    }
}

export const loginSincrono = (uid, displayName, foto, correo) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName,
            foto,
            correo
        }
    }
}

export const logout = () => {

    return (dispatch) => {
        signOut(auth)
            .then(user => {
                dispatch(logoutSincrono())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const logoutSincrono = () => {
    return {
        type: types.logout
    }
}
