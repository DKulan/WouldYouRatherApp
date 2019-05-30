import {_getQuestions, _saveQuestionAnswer} from '../API/_DATA'
import {ADD_VOTE, RECEIVE_QUESTIONS} from './constants'
import {hideLoading, showLoading} from 'react-redux-loading-bar'
import {addAnswer} from './users'


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

const saveUserAnswer = (answerObj) => {
  return (dispatch) => {
    dispatch(addAnswer({...answerObj}))
    dispatch(addVote({...answerObj}))

    return _saveQuestionAnswer({...answerObj})
      .catch(() => {
        alert('Error saving user answer')
      })
  }
}

export {getQuestionData, saveUserAnswer}