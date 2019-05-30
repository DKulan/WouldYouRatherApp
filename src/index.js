import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss'
import App from './components/App';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {logger, checker} from './middleware/middleware'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import users from './reducers/users'
import questions from './reducers/questions'
import authedUser from './reducers/authedUser'
import loading from './reducers/loading'
import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore(combineReducers({
  users,
  questions,
  authedUser,
  loading
}), compose(applyMiddleware(thunk, checker, logger),
  composeWithDevTools()))


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));

