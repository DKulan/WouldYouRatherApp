import React from 'react'
import {connect} from 'react-redux'
import {getUserData, setAuthedUser} from '../actions/users'
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

        this.props.dispatch(setAuthedUser(user))
        this.props.history.push('/')
    }

    render() {
        const {users, loading} = this.props

        if (loading) {
            return <h3>Loading...</h3>
        } else {
            return (
                <section className="hero is-alt is-fullheight">
                    <div className="hero-body">
                        <div className="container">
                            <form className="card is-rounded">
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
                                                className="button is-primary is-medium is-fullwidth">
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

const mapStateToProps = (state) => ({
    users: Object.values(state.users).map((user) => {
        return ({
            ...user
        })
    }),
    loading: state.loading
})

export default connect(mapStateToProps)(LoginPage)