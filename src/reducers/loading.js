const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
const RECEIVE_USERS = 'RECEIVE_USERS'

const loading = (state = true, action) => {
    switch(action.type) {
        case RECEIVE_USERS || RECEIVE_QUESTIONS:
            return false
        default:
            return state
    }
}

export default loading