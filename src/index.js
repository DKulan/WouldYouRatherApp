import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss'
import App from './components/App';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {logger, checker} from './middleware/middleware'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import loading from './reducers/loading'
import users from './reducers/users'
import questions from './reducers/questions'
import authedUser from './reducers/authedUser'
import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore(combineReducers({
    loading,
    users,
    questions,
    authedUser
}), compose(applyMiddleware(thunk, checker, logger),
    composeWithDevTools()))


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

