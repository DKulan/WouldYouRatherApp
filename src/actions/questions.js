import {_getQuestions} from '../API/_DATA'

const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'


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

export {getQuestionData}