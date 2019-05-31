import React from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import LoadingBar from 'react-redux-loading-bar'
import NavBar from './NavBar'


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
    const {toggle} = this.state
    const {answered, unanswered, loading} = this.props

    if (loading) {
      return <LoadingBar/>
    }

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
                      <Question
                        key={question.id}
                        qid={question.id}
                        category={'unanswered'}
                      />
                    ))
                    : answered.map((question) => (
                      <Question
                        key={question.id}
                        qid={question.id}
                        category={'answered'}
                      />
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

const mapStateToProps = ({questions, authedUser, loadingBar}) => {

  const getQuestionCategory = (isItAnswered) => {
    if (!isItAnswered) {
      return Object.values(questions).filter((question) =>
        !question.optionOne.votes.includes(authedUser.id) && !question.optionTwo.votes.includes(authedUser.id))
    } else {
      return Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id)
      )
    }
  }

  return {
    questions,
    answered: Object.values(getQuestionCategory(true)).sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1
      } else if (a.timestamp < b.timestamp) {
        return 1
      } else {
        return 0
      }
    }),
    unanswered: Object.values(getQuestionCategory(false)).sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1
      } else if (a.timestamp < b.timestamp) {
        return 1
      } else {
        return 0
      }
    }),
    loading: loadingBar.default > 0
  }
}

export default connect(mapStateToProps)(HomePage)