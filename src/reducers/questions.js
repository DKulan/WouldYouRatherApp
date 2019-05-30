import {ADD_VOTE, RECEIVE_QUESTIONS} from '../actions/constants'


const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_VOTE:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    default:
      return state
  }
}

export default questions