import {_getUsers} from '../API/_DATA'
import {RECEIVE_USERS} from './constants'


const storeUserData = (users) => ({
  type: RECEIVE_USERS,
  users
})

const getUserData = () => {
  return (dispatch) => {
    return _getUsers()
      .then((users) => {
        dispatch(storeUserData(users))
      })
      .catch(() => {
        alert('Error fetching users')
      })
  }
}

export {getUserData}