import React from 'react'
import {connect} from 'react-redux'
import {getUserData} from '../actions/users'
import {getQuestionData} from '../actions/questions'


class LoginPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(getUserData())
        this.props.dispatch(getQuestionData())
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const userId = this.select.value

        const user = this.props.users.find((user) => {
            if (user.id === userId) {
                return user
            }
        })

        localStorage.setItem('authedUser', JSON.stringify(user))
        this.props.history.push('/')
    }

    render() {
        const {users, history} = this.props

        if (localStorage.getItem('authedUser')) {
            history.push('/')
            return null
        } else {
            return (
                <section className="hero is-alt is-fullheight">
                    <div className="hero-body">
                        <div className="container">
                            <form className="card">
                                <div className="card-content">
                                    <h1 className="title">
                                        Welcome to the Would You Rather App!
                                    </h1>
                                    <h2>Sign in to continue</h2>
                                    <div className="field">
                                        <div className="control">
                                            <div className="select">
                                                <select ref={ref => this.select = ref}>
                                                    {users.map((user) => (
                                                        <option
                                                            key={user.id}
                                                            value={user.id}
                                                        >{user.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <p className="control">
                                            <button
                                                onClick={this.handleSubmit}
                                                type="submit"
                                                className="button is-primary is-medium">
                                                Login
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

const
    mapStateToProps = ({users}) => ({
        users: Object.values(users).map((user) => {
            return ({
                ...user
            })
        })
    })

export default connect(mapStateToProps)(LoginPage)