import {_getUsers} from '../API/_DATA'

const RECEIVE_USERS = 'RECEIVE_USERS'
const AUTHED_USER = 'AUTHED_USER'

const storeUserData = (users) => ({
    type: RECEIVE_USERS,
    users
})

const setAuthedUser = (id) => ({
    type: AUTHED_USER,
    id
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

export {getUserData, setAuthedUser}