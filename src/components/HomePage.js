import React from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import {Link} from 'react-router-dom'
import Question from './Question'
import moment from 'moment'


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
    const {unanswered, answered} = this.props
    const {toggle} = this.state

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
                    ? unanswered.map((question) => (
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
                            qid={question.id}
                          />
                        </Link>
                      </div>
                    ))
                    : answered.map((question) => (
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
                            qid={question.id}
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

const getQuestionCategory = (state, isItAnswered) => {
  const {questions, authedUser} = state
  const answered = []
  const unanswered = []

  Object.keys(questions).map((key) => questions[key]).filter(question => {
    if (authedUser.answers.hasOwnProperty(question.id)) {
      answered.push(question)
    } else {
      unanswered.push(question)
    }
  })

  return isItAnswered ? answered : unanswered
}

const mapStateToProps = (state) => {
  return {
  questions: state.questions,
  authedUser: state.authedUser,
  answered: getQuestionCategory(state, true),
  unanswered: getQuestionCategory(state, false),
  loading: state.loading
}}


export default connect(mapStateToProps)(HomePage)