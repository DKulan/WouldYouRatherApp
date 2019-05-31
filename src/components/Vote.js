import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveUserAnswer} from '../actions/questions'
import LoadingBar from 'react-redux-loading-bar'
import Poll from './Poll'
import NavBar from './NavBar'
import NotFound from './NotFound'


class Vote extends React.Component {
  state = {
    radioValue: 'optionOne',
    redirect: false
  }

  handleChange = (e) => {
    const radioValue = e.target.value
    this.setState(() => ({radioValue}))
  }

  handleRedirect = () => {
    this.setState(() => ({
      redirect: true
    }))
  }

  handleSubmitVote = (answerObj) => {
    const {dispatch} = this.props

    dispatch(saveUserAnswer(answerObj))

    this.handleRedirect()
  }

  render() {
    const {qid, category, user, optionOne, optionTwo} = this.props

    if (this.props.loading) {
      return <LoadingBar/>
    }

    if (user === 'not found' && optionOne === 'not found' && optionTwo === 'not found') {
      return <NotFound />
    }

    if (category === 'answered' || this.state.redirect) {
      return (
        <Poll
          options={{
            optionOne,
            optionTwo
          }}
          qid={qid}
        />
      )
    }

    return (
      <div>
        <NavBar/>
        <div className="hero">
          <div className="div hero-body">
            <div className="container">
              <nav className="panel has-background-white">
                <div className="panel-heading">
                  {console.log(user)}
                  <img
                    className="is-rounded"
                    src={user.avatarURL}
                    alt="avatar icon"
                  />
                  <h1><strong className="has-text-primary">{user.name} Asks: would you rather?</strong></h1>
                </div>
                <div className="panel-body">
                  <div className="panel-block">
                    <div className="field">
                      <div className="control">
                        <label>
                          <input
                            onChange={this.handleChange}
                            type="radio"
                            value="optionOne"
                            name="options"
                            defaultChecked
                          />
                          {optionOne}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="panel-block">
                    <div className="field">
                      <div className="control">
                        <label>
                          <input
                            onChange={this.handleChange}
                            type="radio"
                            value="optionTwo"
                            name="options"/>
                          {optionTwo}
                        </label>
                      </div>
                      <hr/>
                      <button
                        onClick={() => {
                          this.handleSubmitVote({
                            authedUser: this.props.authedUser.id,
                            qid,
                            answer: this.state.radioValue
                          })
                        }}
                        type="submit"
                        className="button is-success">
                        Submit
                      </button>
                      <Link to='/' className="button is-success left-margin">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({authedUser, users, questions, loadingBar}, {match}) => {
  const question = Object.keys(questions).map((key) => questions[key]).filter((q) => (
    q.id === match.params.question_id
  ))

  const getQuestionCategory = () => {
    const isQuestionAnswered = Object.keys(authedUser.answers).includes(match.params.question_id)

    if (isQuestionAnswered) {
      return 'answered'
    } else {
      return 'unanswered'
    }
  }

  const checkUserInfo = () => {
    if (question[0]) {
      return users[question[0].author]
    } else {
      return 'not found'
    }
  }

  const checkOptionInfo = (option) => {
    if (option === 'one') {
      return question[0] ? question[0].optionOne.text : 'not found'
    } else if (option === 'two') {
      return question[0] ? question[0].optionTwo.text : 'not found'
    }
  }

  return {
    question: Object.values(question),
    optionOne: checkOptionInfo('one'),
    optionTwo: checkOptionInfo('two'),
    user: checkUserInfo(),
    qid: match.params.question_id,
    category: getQuestionCategory(),
    authedUser,
    loading: loadingBar.default > 0
  }
}

export default connect(mapStateToProps)(Vote)