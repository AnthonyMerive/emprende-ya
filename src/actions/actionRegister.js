import { types } from '../types/types'
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

// export const registroEmailPasswordNombre = (email, password, name) => {
//     return (dispatch) => {
//         const auth = getAuth();
//         createUserWithEmailAndPassword(auth, 
//             email, 
//             password
//             ).then(async ({user}) =>{

//                 await updateProfile(auth.currentUser, {displayName: name})
                
//                 dispatch(registerSincrono(user.email, user.uid, user.displayName))
//                 console.log(user);
//             }).catch(error =>{
//                 console.log(error)
//             })

//     }
// }


export const registerSincrono = (displayName, email, password, phoneNumber) => {
    return {
        type: types.register,
        payload: {
            displayName,
            email,
            password,
            phoneNumber
        }
    }
}