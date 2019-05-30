import {AUTHED_USER, CLEAR_AUTHED} from './constants'


const setAuthedUser = (authedUser) => ({
  type: AUTHED_USER,
  authedUser
})

const clearAuthedUser = () => ({
  type: CLEAR_AUTHED
})

export {setAuthedUser, clearAuthedUser}