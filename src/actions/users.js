import {_getUsers} from '../API/_DATA'
import {RECEIVE_USERS} from './constants'
import {hideLoading, showLoading} from 'react-redux-loading-bar'


const storeUserData = (users) => ({
  type: RECEIVE_USERS,
  users
})

const getUserData = () => {
  return (dispatch) => {
    dispatch(showLoading())

    return _getUsers()
      .then((users) => {
        dispatch(storeUserData(users))
        dispatch(hideLoading())
      })
      .catch(() => {
        alert('Error fetching users')
      })
  }
}

export {getUserData}