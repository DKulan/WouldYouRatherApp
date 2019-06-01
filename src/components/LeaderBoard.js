import React from 'react'
import NavBar from './NavBar'
import {connect} from 'react-redux'


const LeaderBoard = (props) => {
  return (
    <div>
      <NavBar/>
      <div className="hero">
        <div className="div hero-body">
          <div className="container">
            {
              props.sortedUsers.map((user) => (
                <nav className="panel has-background-white">
                  <div className="panel-heading">
                    <div className="panel-icon image is-32x32">
                      <img
                        className="is-rounded"
                        src={user.avatarURL}
                        alt="avatar icon"
                      />
                    </div>
                    <p className="medium-heading-text"><strong className="has-text-primary">{user.name} has a total score of: {Object.values(user.answers).length + user.questions.length}</strong></p>
                    <div className="panel-body">
                      <p className="small-heading-text">Answered questions: {Object.values(user.answers).length}</p>
                      <p className="small-heading-text">Questions Created: {user.questions.length}</p>
                    </div>
                  </div>
                </nav>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({users}) => {
  const sortedUsers = Object.values(users).sort((a, b) => {
    if (Object.values(a.answers).length + a.questions.length > Object.values(b.answers).length + b.questions.length) {
      return -1
    } else if (Object.values(a.answers).length + a.questions.length < Object.values(b.answers).length + b.questions.length) {
      return 1
    } else {
      return 0
    }
  })

  return {
    sortedUsers
  }
}

export default connect(mapStateToProps)(LeaderBoard)