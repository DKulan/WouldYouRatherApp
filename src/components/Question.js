import React from 'react'


const Question = (props) => (
    <a className="panel-block">
        {props.question.author}
    </a>
)

export default Question