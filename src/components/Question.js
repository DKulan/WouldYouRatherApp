import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Link} from 'react-router-dom'


class Question extends React.Component {
  render() {
    const {question, user, qid} = this.props

    return (
      <div>
        <div className="panel-heading">
          <p className="small-heading-text">Posted
            on: {moment(question.timestamp).format('MMMM Do, YYYY')}</p>
        </div>
        <Link
          to={{
            pathname: `/question/${qid}`,
            state: {
              qid,
              question,
              category: this.props.category
            }
          }}
          className="panel-block">
            <span className="panel-icon image is-32x32">
            <img
              className="is-rounded"
              src={user.avatarURL}
              alt="avatar icon"
            />
        </span>
          <h1><strong>{user.name} posts:</strong> would you
            rather {question.optionOne.text} <strong>OR</strong> {question.optionTwo.text}</h1>
        </Link>
      </div>
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