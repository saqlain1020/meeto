import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './Redux/store';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store = {store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {/* <HashRouter baseame="/"> */}
    <App />
    {/* </HashRouter> */}
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
