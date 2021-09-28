import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>

      <AppRouter />
      
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);
