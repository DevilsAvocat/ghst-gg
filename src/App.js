import React from 'react';
import  { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './root/MainLayout/MainLayout';

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={ MainLayout } />
            </Switch>
        </BrowserRouter>
    );
}
