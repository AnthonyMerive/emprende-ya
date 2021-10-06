import {createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {loginReducer} from '../reducers/loginReducer'
import {registerReducer} from '../reducers/registerReducer'
import { obtenerLocalStorage, guardarLocalStorage}from '../localStorage'
import thunk from 'redux-thunk';
import { addEmpReducer } from '../reducers/addEmpReducer';
// combina los reducer existentes
const reducers = combineReducers({

    login: loginReducer,
    register: registerReducer,
    Emprendimientos:addEmpReducer
    //aca se agregarian los demas productos
    //como un objeto
})

const composeEnhancers = (typeof window !== 'undefined' &&
 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const storageState = obtenerLocalStorage();

export const store = createStore(
    reducers, 
    storageState, 
    composeEnhancers(
      applyMiddleware(thunk))

)

store.subscribe(()=>{
  guardarLocalStorage({
    login: store.getState().login
  })
})