import React from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import QuestionTab from './QuestionTab'


class HomePage extends React.Component {
    state = {
        toggle: false
    }

    handleToggle = (status) => {
        if (status) {
            this.setState(() => ({
                toggle: true
            }))
        } else {
            this.setState(() => ({
                toggle: false
            }))
        }
    }

    render() {
        const {unanswered, answered, history, authedUser} = this.props
        const {toggle} = this.state

        if (Object.entries(authedUser).length === 0) {
            history.push('/')
            return null
        } else {
            return (
                <div>
                    <NavBar/>
                    <div className="hero">
                        <div className="div hero-body">
                            <div className="container">
                                <nav className="panel has-background-white">
                                    <p className="panel-tabs">
                                        <a
                                            className={toggle ? '' : 'is-active'}
                                            onClick={() => this.handleToggle(false)}
                                        >Unanswered</a>
                                        <a
                                            className={toggle ? 'is-active' : ''}
                                            onClick={() => this.handleToggle(true)}
                                        >Answered</a>
                                    </p>
                                    {
                                        !toggle
                                            ? <QuestionTab
                                                category={`unanswered`}
                                                questions={unanswered}
                                            />
                                            : <QuestionTab
                                                category={`answered`}
                                                questions={answered}
                                            />
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


const mapStateToProps = ({questions, authedUser, loading}) => {
    const answered = []
    const unanswered = []

    Object.keys(questions).map((key) => questions[key]).filter(question => {
        if (authedUser.answers.hasOwnProperty(question.id)) {
            answered.push(question)
        } else {
            unanswered.push(question)
        }
    })

    return {
        questions,
        authedUser,
        answered,
        unanswered,
        loading
    }
}

export default connect(mapStateToProps)(HomePage)