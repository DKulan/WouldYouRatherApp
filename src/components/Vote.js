import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveUserAnswer} from '../actions/questions'
import LoadingBar from 'react-redux-loading-bar'


class Vote extends React.Component {
  state = {
    radioValue: 'optionOne'
  }

  handleChange = (e) => {
    const radioValue = e.target.value
    this.setState(() => ({radioValue}))
  }

  handleSubmitVote = (answerObj) => {
    const {dispatch, history} = this.props

    dispatch(saveUserAnswer(answerObj))
    history.push('/')
  }

  render() {
    const {qid} = this.props.match.params
    const {question} = this.props.location.state
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text

    if (this.props.loading) {
      return <LoadingBar/>
    }

    return (
      <div>
        <div className="hero">
          <div className="div hero-body">
            <div className="container">
              <nav className="panel has-background-white">
                <div className="panel-heading">
                  <h1><strong className="has-text-primary">Would you rather?</strong></h1>
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

const mapStateToProps = ({authedUser, loadingBar}) => ({
  authedUser,
  loading: loadingBar.default > 0
})

export default connect(mapStateToProps)(Vote)