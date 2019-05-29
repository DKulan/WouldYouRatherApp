import {_getUsers, _saveQuestionAnswer} from '../API/_DATA'
import {getQuestionData} from './questions'

const RECEIVE_USERS = 'RECEIVE_USERS'
const AUTHED_USER = 'AUTHED_USER'
const CLEAR_AUTHED = 'CLEAR_AUTHED'


const storeUserData = (users) => ({
    type: RECEIVE_USERS,
    users
})

const setAuthedUser = (authedUser) => ({
    type: AUTHED_USER,
    authedUser
})

const clearAuthedUser = () => ({
    type: CLEAR_AUTHED
})

const saveUserAnswer = (answerObj) => {
    return (dispatch) => {
        return _saveQuestionAnswer({...answerObj})
            .then(() => {
                dispatch(getUserData())
                dispatch(getQuestionData())
            })
            .catch(() => {
                alert('Error saving user answer')
            })
    }
}

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

export {getUserData, setAuthedUser, clearAuthedUser, saveUserAnswer}