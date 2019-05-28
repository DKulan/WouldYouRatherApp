import React from 'react'
import {connect} from 'react-redux'


const Question = (props) => (
    <React.Fragment>
        <span className="panel-icon image is-32x32">
            <img
                className="is-rounded"
                src={props.userDetails.avatarURL}
            />
        </span>
        <h1><strong>{props.userDetails.name} posts:</strong> would you
            rather {props.userDetails.optionOne.text} <strong>OR</strong> {props.userDetails.optionTwo.text}</h1>
    </React.Fragment>
)

const mapStateToProps = ({users}, {question}) => {
    let userDetails = {}

    Object.keys(users).map((key) => users[key]).filter((user) => {
        if (question.author.includes(user.id)) {
            userDetails = {
                avatarURL: user.avatarURL,
                name: user.name
            }
        }
    })

    return {
        userDetails: {
            name: userDetails.name,
            avatarURL: Object.values(userDetails.avatarURL),
            optionOne: question.optionOne,
            optionTwo: question.optionTwo
        }
    }
}

export default connect(mapStateToProps)(Question)