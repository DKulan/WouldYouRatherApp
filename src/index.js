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
import {loadingBarReducer} from 'react-redux-loading-bar'


const store = createStore(combineReducers({
  users,
  questions,
  authedUser,
  loadingBar: loadingBarReducer
}), compose(applyMiddleware(thunk, checker, logger)))


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));

