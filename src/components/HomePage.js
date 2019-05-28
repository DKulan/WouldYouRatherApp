import React from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import Question from './Question'
import moment from 'moment'
import Vote from './Vote'
import {Link} from 'react-router-dom'


class HomePage extends React.Component {
    state = {
        tab: false
    }

    handleTabToggle = (status) => {
        if (this.state.tab !== status) {
            this.setState(() => ({
                tab: status
            }))
        }
    }

    render() {
        const {authedUser, history} = this.props
        const {tab} = this.state

        if (Object.entries(authedUser).length === 0) {
            history.push('/login')
            return null
        } else {
            return (
                <div>
                    <NavBar/>
                    <div className="hero">
                        <div className="div hero-body">
                            <div className="container">
                                <nav className="panel list-panel">
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
                                            ? this.props.sortedUnanswered.map((question) => (
                                                <div>
                                                    <div className="panel-heading">
                                                        <p className="small-heading-text">Posted
                                                            on: {moment(question.timestamp).format('MMMM Do, YYYY')}</p>
                                                    </div>
                                                    <Link to={{
                                                        pathname: '/vote',
                                                        state: {question}
                                                    }} className="panel-block">
                                                        <Question
                                                            question={question}
                                                            key={question.id}
                                                        />
                                                    </Link>
                                                </div>
                                            ))
                                            : this.props.sortedAnswered.map((question) => (
                                                <div>
                                                    <div className="panel-heading">
                                                        <p className="small-heading-text">Posted
                                                            on: {moment(question.timestamp).format('MMMM Do, YYYY')}</p>
                                                    </div>
                                                    <Link to={{
                                                        pathname: '/vote',
                                                        state: {question}
                                                    }} className="panel-block">
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
}

const mapStateToProps = ({questions, authedUser, users}) => {
    const answered = []
    const unanswered = []

    Object.keys(questions).map((key) => questions[key]).filter(question => {
        if (Object.keys(authedUser).length > 0) {
            if (authedUser.answers.hasOwnProperty(question.id)) {
                answered.push(question)
            } else {
                unanswered.push(question)
            }
        }
    })

    const sortedAnswered = answered.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
            return -1
        } else if (a.timestamp > b.timestamp) {
            return 1
        } else {
            return 0
        }
    })

    const sortedUnanswered = unanswered.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
            return -1
        } else if (a.timestamp > b.timestamp) {
            return 1
        } else {
            return 0
        }
    })

    return {
        questions,
        authedUser,
        sortedAnswered,
        sortedUnanswered
    }
}

export default connect(mapStateToProps)(HomePage)