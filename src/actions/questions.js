import {_getQuestions, _saveQuestionAnswer, _saveQuestion} from '../API/_DATA'
import {ADD_VOTE, RECEIVE_QUESTIONS} from './constants'
import {hideLoading, showLoading} from 'react-redux-loading-bar'
import {addAnswer, getUserData} from './users'


const storeQuestionData = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions
})

const addVote = ({authedUser, qid, answer}) => ({
  type: ADD_VOTE,
  authedUser,
  qid,
  answer
})

const getQuestionData = () => {
  return (dispatch) => {
    dispatch(showLoading())

    return _getQuestions()
      .then((questions) => {
        dispatch(storeQuestionData(questions))
        dispatch(hideLoading())
      })
  }
}

const saveQuestion = (question) => {
  return (dispatch) => {
    return _saveQuestion(question)
      .then(() => {
        dispatch(getQuestionData())
        dispatch(getUserData())
      })
  }
}

const saveUserAnswer = (answerObj) => {
  return (dispatch) => {
    dispatch(addAnswer({...answerObj}))
    dispatch(addVote({...answerObj}))

    // If there is an Error with the API we need to remove answer/vote (optimistic update)
    return _saveQuestionAnswer({...answerObj})
      .catch(() => {
        alert('Error saving user answer')
      })
  }
}

export {getQuestionData, saveUserAnswer, saveQuestion}