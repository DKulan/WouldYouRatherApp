import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Question from './Question'


class QuestionTab extends React.Component {
    render() {
        const {questions} = this.props

        return (
            <React.Fragment>
                {questions.map((question) => (
                    <div key={question.id}>
                        <div className="panel-heading">
                            <p className="small-heading-text">Posted
                                on: {moment(question.timestamp).format('MMMM Do, YYYY')}</p>
                        </div>
                        <Link
                            to={{
                                pathname: `/question/${question.id}`,
                                state: {question}
                            }}
                            className="panel-block">
                            <Question
                                question={question}
                                key={question.id}
                            />
                        </Link>
                    </div>
                ))}
            </React.Fragment>
        )
    }
}

export default QuestionTab