import React from 'react'
import NavBar from './NavBar'


const AddNewQuestion = (props) => {

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
                  <input className="input is-half" type="text"/>
                </div>
                <label className="label">or</label>
                <div className="control">
                  <input className="input is-half" type="text"/>
                </div>
                <div className="control">
                  <button className="button is-primary margin-top">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewQuestion