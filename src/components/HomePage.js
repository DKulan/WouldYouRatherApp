import React from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import UnansweredQuestions from './UnansweredQuestions'
import AnsweredQuestions from './AnsweredQuestions'


class HomePage extends React.Component {
    state = {
        tab: "unanswered"
    }

    handleTabToggle = () => {
        if (this.state.tab === "unanswered") {
            this.setState(() => ({
                tab: "answered"
            }))
        } else {
            this.setState(() => ({
                tab: "unanswered"
            }))
        }
    }


    render() {
        const {authedUser, history} = this.props
        const {tab} = this.state

        if (Object.entries(authedUser).length === 0) {
            history.push('/login')
            return null
        } else {
            return (
                <div>
                    <NavBar/>
                    <div className="hero">
                        <div className="div hero-body">
                            <div className="container">
                                <nav className="panel homepage-list">
                                    <p className="panel-tabs">
                                        {
                                            tab === "unanswered"
                                                ? <a className="is-active">Unanswered</a>
                                                : <a onClick={this.handleTabToggle}>Unanswered</a>
                                        }
                                        {
                                            tab === "answered"
                                                ? <a className="is-active">Answered</a>
                                                : <a onClick={this.handleTabToggle}>Answered</a>
                                        }
                                    </p>
                                    {
                                        tab === "unanswered"
                                            ? <UnansweredQuestions/>
                                            : <AnsweredQuestions/>
                                    }
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    authedUser: state.authedUser
})

export default connect(mapStateToProps)(HomePage)