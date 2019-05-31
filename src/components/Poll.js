import React from 'react'
import {connect} from 'react-redux'


const Poll = (props) => {
  return (
    <div className="panel-body">
      <div className="panel-block">
        <div className="fields">
          <h1>{props.options.optionOne}</h1>
          <div className="fields">
            <p className="has-text-primary">{props.numOfOptOne} user{props.numOfOptOne === 0 && 's'}{props.numOfOptOne > 1 && 's'} voted for this</p>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="fields">
          <h1>{props.options.optionTwo}</h1>
          <div className="fields">
            <p className="has-text-primary">{props.numOfOptTwo} user{props.numOfOptTwo === 0 && 's'}{props.numOfOptTwo > 1 && 's'} voted for this</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({users}, {options, qid}) => {
  let numOfOptOne = 0
  let numOfOptTwo = 0

  Object.values(users).map((user) => {
    if (user.answers[qid] === 'optionOne') {
      numOfOptOne++
    } else if (user.answers[qid] === 'optionTwo') {
      numOfOptTwo++
    }
  })

  return {
    numOfOptOne,
    numOfOptTwo
  }
}

export default connect(mapStateToProps)(Poll)