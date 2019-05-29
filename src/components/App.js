import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PrivateRoute from 'react-private-route'
import NotFound from './NotFound'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import Vote from './Vote'


const App = (props) => {
    const isLoggedIn = () => {
        if (Object.entries(props.authedUser).length === 0) {
            return false
        } else {
            return true
        }
    }

    const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
        return (
            <Route
                {...rest}
                render={(props) => authenticated === true
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
            />
        )
    }

    return (
        <BrowserRouter>
            <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <PrivateRoute exact path="/" component={HomePage} authenticated={isLoggedIn()}/>
                    <PrivateRoute path="/question/:qid" component={Vote} authenticated={isLoggedIn()}/>
                    <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

const mapStateToProps = ({authedUser}) => ({
    authedUser
})

export default connect(mapStateToProps)(App)
