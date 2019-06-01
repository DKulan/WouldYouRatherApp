import React from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'


const Poll = (props) => {
  return (
    <div>
      <NavBar/>
      <div className="hero">
        <div className="div hero-body">
          <div className="container">
            <nav className="panel has-background-white">
              <div className="panel-heading">
                <img
                  className="is-rounded"
                  src={props.user.avatarURL}
                  alt="avatar icon"
                />
                <h1><strong className="has-text-primary">{props.user.name} Asks: would you rather?</strong></h1>
              </div>
              <div className="panel-body">
                <div className="panel-block">
                  <div className="container">
                    <div className="fields">
                      <h1><strong>{props.options.optionOne}</strong> {props.userChoice === 'optionOne' && <span className="has-text-danger">(Your vote)</span>}</h1>
                      <p
                        className="has-text-primary">{props.numOfOptOne} user{props.numOfOptOne === 0 && 's'}{props.numOfOptOne > 1 && 's'} voted
                        for this</p>
                    </div>
                    <div className="fields">
                      <progress className="progress is-primary" value={props.percentageOptionOne} max="100">{props.percentageOptionOne}%</progress>
                    </div>
                  </div>
                </div>
                <div className="panel-block">
                  <div className="container">
                    <div className="fields">
                      <h1><strong>{props.options.optionTwo}</strong> {props.userChoice === 'optionTwo' && <span className="has-text-danger">(Your vote)</span>}</h1>
                      <p
                        className="has-text-primary">{props.numOfOptTwo} user{props.numOfOptTwo === 0 && 's'}{props.numOfOptTwo > 1 && 's'} voted
                        for this</p>
                    </div>
                    <div className="fields">
                      <progress className="progress is-primary" value={props.percentageOptionTwo} max="100">{props.percentageOptionTwo}%</progress>
                    </div>
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

const mapStateToProps = ({authedUser, users}, {qid, user}) => {
  let numOfOptOne = 0
  let numOfOptTwo = 0

  Object.values(users).map((user) => {
    if (user.answers[qid] === 'optionOne') {
      numOfOptOne++
    } else if (user.answers[qid] === 'optionTwo') {
      numOfOptTwo++
    }
    return null
  })

  const userChoice = authedUser.answers[qid]

  return {
    user,
    userChoice,
    authedUser,
    numOfOptOne,
    numOfOptTwo,
    percentageOptionOne: Math.floor(numOfOptOne/(numOfOptOne+numOfOptTwo)*100),
    percentageOptionTwo: Math.floor(numOfOptTwo/(numOfOptOne+numOfOptTwo)*100)
  }
}

export default connect(mapStateToProps)(Poll)