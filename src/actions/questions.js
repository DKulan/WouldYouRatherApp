import {_getQuestions, _saveQuestionAnswer} from '../API/_DATA'
import {getUserData} from './users'
import {RECEIVE_QUESTIONS} from './constants'
import {hideLoading, showLoading} from 'react-redux-loading-bar'


const storeQuestionData = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions
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
    return _saveQuestionAnswer({...answerObj})
      .then(() => {
        dispatch(getQuestionData())
        dispatch(getUserData())
      })
      .catch(() => {
        alert('Error saving user answer')
      })
  }
}

export {getQuestionData, saveUserAnswer}