import React from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import Question from './Question'
import moment from 'moment'
import {Link} from 'react-router-dom'


class HomePage extends React.Component {
    state = {
        tab: false,
        answered: [],
        unanswered: []
    }

    componentWillMount() {
        const {questions} = this.props

        Object.keys(questions).map((key) => questions[key]).filter(question => {
            const authedUser = JSON.parse(localStorage.getItem('authedUser'))
            if (authedUser.answers.hasOwnProperty(question.id)) {
                this.setState((prevState) => ({
                    answered: prevState.answered.concat([question])
                }))
            } else {
                this.setState((prevState) => ({
                    unanswered: prevState.unanswered.concat([question])
                }))
            }
            return question
        })
    }

    handleTabToggle = (status) => {
        if (this.state.tab !== status) {
            this.setState(() => ({
                tab: status
            }))
        }
    }

    render() {
        const authedUser = JSON.parse(localStorage.getItem('authedUser'))
        const {tab} = this.state

        return (
            <div>
                <NavBar/>
                <div className="hero">
                    <div className="div hero-body">
                        <div className="container">
                            <nav className="panel has-background-white">
                                <p className="panel-tabs">
                                    <a
                                        className={!tab ? 'is-active' : ''}
                                        onClick={() => this.handleTabToggle(false)}
                                    >Unanswered</a>
                                    <a
                                        className={tab ? 'is-active' : ''}
                                        onClick={() => this.handleTabToggle(true)}
                                    >Answered</a>
                                </p>
                                {
                                    !tab
                                        ? this.state.unanswered.map((question) => (
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
                                        ))
                                        : this.state.answered.map((question) => (
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
                                                        answer={authedUser.answers[question.id]}
                                                        key={question.id}
                                                    />
                                                </Link>
                                            </div>
                                        ))
                                }
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({questions, authedUser}) => ({
    questions,
    authedUser
})

export default connect(mapStateToProps)(HomePage)