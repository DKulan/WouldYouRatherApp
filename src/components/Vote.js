import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveUserAnswer} from '../actions/questions'
import LoadingBar from 'react-redux-loading-bar'
import Poll from './Poll'
import NavBar from './NavBar'


class Vote extends React.Component {
  state = {
    radioValue: 'optionOne',
    redirect: false
  }

  handleRedirect = () => {
    this.setState(() => ({
      redirect: true
    }))
  }

  handleChange = (e) => {
    const radioValue = e.target.value
    this.setState(() => ({radioValue}))
  }

  handleSubmitVote = (answerObj) => {
    const {dispatch} = this.props

    dispatch(saveUserAnswer(answerObj))

    this.handleRedirect()
  }

  render() {
    const {question, qid, category} = this.props
    const optionOne = question[0].optionOne.text
    const optionTwo = question[0].optionTwo.text

    console.log(question[0].optionOne, qid, category)


    if (this.props.loading) {
      return <LoadingBar/>
    }

    if (this.state.redirect) {
      return (
        <div>
          <NavBar/>
          <div className="hero">
            <div className="div hero-body">
              <div className="container">
                <nav className="panel has-background-white">
                  <div className="panel-heading">
                    <h1><strong className="has-text-primary">Poll Results</strong></h1>
                  </div>
                  <Poll
                    options={{
                      optionOne,
                      optionTwo
                    }}
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>
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
                  <h1><strong className="has-text-primary">Would you rather?</strong></h1>
                </div>
                {category === 'answered'
                  ? <Poll
                    options={{
                      optionOne,
                      optionTwo
                    }}
                  />
                  : <div className="panel-body">
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
                }
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({authedUser, questions, loadingBar}, {match}) => {
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

  return {
    question: Object.values(question),
    qid: match.params.question_id,
    category: getQuestionCategory(),
    authedUser,
    loading: loadingBar.default > 0
  }
}

export default connect(mapStateToProps)(Vote)