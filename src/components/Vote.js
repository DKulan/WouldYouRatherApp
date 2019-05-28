import React from 'react'
import NavBar from './NavBar'
import {Link} from 'react-router-dom'


class Vote extends React.Component {
    render() {
        const optionOne = Object.values(this.props.location.state.question.optionOne.text)
        const optionTwo = Object.values(this.props.location.state.question.optionTwo.text)

        return (
            <div>
                <NavBar/>
                <div className="hero">
                    <div className="div hero-body">
                        <div className="container">
                            <nav className="panel has-background-white">
                                <div className="panel-heading">
                                    <h1><strong className="has-text-primary">Would you rather?</strong></h1>
                                </div>
                                <form>
                                    <div className="panel-body">
                                        <div className="panel-block">
                                            <div className="field">
                                                <div className="control">
                                                    <label>
                                                        <input type="radio" value="optionOne" name="options"/>
                                                        {optionOne}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-block">
                                            <div className="field">
                                                <div className="control">
                                                    <label>
                                                        <input type="radio" value="optionTwo" name="options"/>
                                                        {optionTwo}
                                                    </label>
                                                </div>
                                                <hr/>
                                                <button onSubmit={this.handleSubmit} className="button is-success">
                                                    Submit
                                                </button>
                                                <Link to='/' onSubmit={this.handleSubmit}
                                                      className="button is-success left-margin">
                                                    Cancel
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Vote