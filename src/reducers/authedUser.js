import {AUTHED_USER, ADD_ANSWER, CLEAR_AUTHED} from '../actions/constants'


const authedUser = (state = {}, action) => {
  switch (action.type) {
    case AUTHED_USER:
      return {
        ...state,
        ...action.authedUser
      }
    case ADD_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.qid]: action.answer
        }
      }
    case CLEAR_AUTHED:
      return {}
    default:
      return state
  }
}

export default authedUser