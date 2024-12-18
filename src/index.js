import React from 'react';  
import ReactDOM from 'react-dom/client'; 
import App from './App';  
import './index.css';  
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>  
        <App />  
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
