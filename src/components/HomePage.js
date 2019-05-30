import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Question from './Question'
import moment from 'moment'


class HomePage extends React.Component {
  state = {
    toggle: false,
    answered: [],
    unanswered: []
  }

  componentDidMount() {
    const {authedUser, questions} = this.props

    this.setQuestionCategory(questions, authedUser)
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

  setQuestionCategory = (questions, authedUser) => {
    Object.keys(questions).map((key) => questions[key]).filter(question =>
      authedUser.answers.hasOwnProperty(question.id)
        ? this.setState((prevState) => ({
            answered: prevState.answered.concat([question])
          }))
        : this.setState((prevState) => ({
            unanswered: prevState.unanswered.concat([question])
          }))
    )
  }

  render() {
    const {toggle, answered, unanswered} = this.state

    return (
      <div>
        <div className="hero">
          <div className="div hero-body">
            <div className="container">
              <nav className="panel has-background-white">
                <p className="panel-tabs">
                  <a
                    className={toggle ? 'button' : 'is-active button'}
                    onClick={() => this.handleToggle(false)}
                  >Unanswered</a>
                  <a
                    className={toggle ? 'is-active button' : 'button'}
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

const mapStateToProps = ({questions, authedUser}) => ({
  questions,
  authedUser
})

export default connect(mapStateToProps)(HomePage)