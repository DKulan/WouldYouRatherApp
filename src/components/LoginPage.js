import React from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {getUserData} from '../actions/users'
import {getQuestionData} from '../actions/questions'
import LoadingBar from 'react-redux-loading-bar'


class LoginPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUserData())
    this.props.dispatch(getQuestionData())
  }

  handleSubmit = () => {
    const {dispatch, history} = this.props

    const userId = this.select.value

    const user = this.props.users.find((user) => user.id === userId ? user : undefined)

    dispatch(setAuthedUser(user))

    if (history.action === 'REPLACE') {
      history.push(`${history.location.state.from.pathname}`)
    } else {
      history.push('/')
    }
  }

  render() {
    const {users, loading} = this.props

    console.log(this.props)

    if (loading) {
      return <LoadingBar/>
    }

    return (
      <div>
        <section className="hero is-alt is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div className="card">
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
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({users, loadingBar}) => ({
  users: Object.values(users).map((user) => {
    return ({
      ...user
    })
  }),
  loading: loadingBar.default > 0
})

export default connect(mapStateToProps)(LoginPage)