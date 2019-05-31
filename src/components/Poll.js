import React from 'react'


const Poll = (props) => {
  return (
    <div className="panel-body">
      <div className="panel-block">
        <h1>{props.options.optionOne}</h1>
      </div>
      <div className="panel-block">
        <h1>{props.options.optionTwo}</h1>
      </div>
    </div>
  )
}

export default Poll