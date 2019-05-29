import {_getQuestions} from '../API/_DATA'
import {hideLoading, showLoading} from 'react-redux-loading-bar'

const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'


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

export {getQuestionData}