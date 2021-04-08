import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { theme } from './themes/ghst';
import {BrowserRouter} from 'react-router-dom';

const apiUrl = process.env.REACT_APP_BASE_URL;

// set base API URL
axios.defaults.baseURL = apiUrl;

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App/>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
