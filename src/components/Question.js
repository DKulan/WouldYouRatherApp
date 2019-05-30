import React from 'react'
import {connect} from 'react-redux'


class Question extends React.Component {
  render() {
    const {question, user} = this.props

    return (
      <React.Fragment>
        <span className="panel-icon image is-32x32">
            <img
              className="is-rounded"
              src={user.avatarURL}
              alt="avatar icon"
            />
        </span>
        <h1><strong>{user.name} posts:</strong> would you
          rather {question.optionOne.text} <strong>OR</strong> {question.optionTwo.text}</h1>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({users, questions}, {qid}) => {
  const question = questions[qid]
  const user = users[question.author]

  return {
    question,
    user
  }
}

export default connect(mapStateToProps)(Question)