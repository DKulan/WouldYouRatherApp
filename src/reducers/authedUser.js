const AUTHED_USER = 'AUTHED_USER'
const CLEAR_AUTHED = 'CLEAR_AUTHED'


const authedUser = (state = {}, action) => {
    switch (action.type) {
        case AUTHED_USER:
            return {
                ...state,
                ...action.authedUser
            }
        case CLEAR_AUTHED:
            return {}
        default:
            return state
    }
}

export default authedUser