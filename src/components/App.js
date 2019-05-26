import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'


const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/login" component={LoginPage}/>
        </Switch>
    </BrowserRouter>
)


export default App;
