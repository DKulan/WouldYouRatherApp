import {_getQuestions, _saveQuestionAnswer} from '../API/_DATA'
import {RECEIVE_QUESTIONS} from './constants'


const storeQuestionData = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions
})

const getQuestionData = () => {
  return (dispatch) => {
    return _getQuestions()
      .then((questions) => {
        dispatch(storeQuestionData(questions))
      })
  }
}

const saveUserAnswer = (answerObj) => {
  return () => {
    return _saveQuestionAnswer({...answerObj})
      .catch(() => {
        alert('Error saving user answer')
      })
  }
}

export {getQuestionData, saveUserAnswer}