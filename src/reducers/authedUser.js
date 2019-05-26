const AUTHED_USER = 'AUTHED_USER'


const authedUser = (state = [], action) => {
    switch (action.type) {
        case AUTHED_USER:
            return [...state, action.id]
        default:
            return state
    }
}

export default authedUser