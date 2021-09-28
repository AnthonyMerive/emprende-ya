import {createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import {productoReducer} from '../reducers/productoReducer'
// import {citasReducer} from '../reducers/citasReducer'
import {loginReducer} from '../reducers/loginReducer'
import {registerReducer} from '../reducers/registerReducer'
// import { obtenerLocalStorage, guardarLocalStorage}from '../localStorage'
import thunk from 'redux-thunk';
// combina los reducer existentes
const reducers = combineReducers({
    //productos: productoReducer
    login: loginReducer,
    register: registerReducer
    //aca se agregarian los demas productos
    //como un objeto
})

const composeEnhancers = (typeof window !== 'undefined' &&
 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const storageState = obtenerLocalStorage();// aplica para ejercicio 2

//creamos el store
export const store = createStore(
    reducers, //nuestros reducers combinados
    //storageState, //agrego el locaStorage al store (aplica para el ejercicio 2)
    composeEnhancers(
      applyMiddleware(thunk))
    
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //devtools de redux
)

//tomar datos del localStore o DB: (aplica para el ejercicio 2)
// store.subscribe(()=>{
//     guardarLocalStorage({
//       citas: store.getState().citas
//     })
//   })