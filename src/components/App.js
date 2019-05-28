import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import Vote from './Vote'


const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/vote" component={Vote}/>
        </Switch>
    </BrowserRouter>
)


export default App;
