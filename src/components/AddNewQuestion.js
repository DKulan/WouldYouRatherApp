import React from 'react'
import NavBar from './NavBar'
import {connect} from 'react-redux'
import {saveQuestion} from '../actions/questions'


class AddNewQuestion extends React.Component {
  handleSubmit = () => {
    this.props.dispatch(saveQuestion({
      author: this.props.authedUser.id,
      optionOneText: this.optionOneText.value,
      optionTwoText: this.optionTwoText.value
    }))

    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="hero">
          <div className="hero-body">
            <div className="panel">
              <div className="panel-heading">
                <h1 className="title has-text-primary">Create a new question</h1>
              </div>
              <div className="panel-block has-background-white-bis">
                <div className="field">
                  <label className="label">Would you rather</label>
                  <div className="control">
                    <input
                      className="input is-half"
                      type="text"
                      ref={optionOneText => this.optionOneText = optionOneText}
                    />
                  </div>
                  <label className="label">or</label>
                  <div className="control">
                    <input
                      className="input is-half"
                      type="text"
                      ref={optionTwoText => this.optionTwoText = optionTwoText}
                    />
                  </div>
                  <div className="control">
                    <button
                      onClick={this.handleSubmit}
                      className="button is-primary margin-top"
                    >Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/*
  p.s don't forget optimistic updates in the async action creators.
 */

const mapStateToProps = ({authedUser}) => ({
  authedUser
})

export default connect(mapStateToProps)(AddNewQuestion)