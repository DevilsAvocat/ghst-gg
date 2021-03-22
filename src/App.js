import React from 'react';
import  { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './root/MainLayout/MainLayout';
import GhostExplorer from "./pages/GhostExplorer/GhostExplorer";
import SnackbarContextProvider from "./contexts/SnackbarContext";

export default function App() {
    return (
        <BrowserRouter>
            <SnackbarContextProvider>
                <Switch>
                    <Route exact path='/explorer' component={ GhostExplorer } />
                    <Route path='/' component={ MainLayout } />
                </Switch>
            </SnackbarContextProvider>
        </BrowserRouter>
    );
}
