import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {clearAuthedUser} from '../actions/authedUser'
import {connect} from 'react-redux'


const NavBar = (props) => {
  const handleLogout = () => {
    props.dispatch(clearAuthedUser())
    props.history.push('/login')
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasic" className="navbar-menu">
        <div className="navbar-start">
          <Link to={'/'} className="navbar-item">Home</Link>
          <Link to={'/leaderboard'} className="navbar-item">Leader board</Link>
          <Link to={'/'} className="navbar-item">New Question</Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="image is-32x32">
              <img className="is-rounded image is-32x32"
                   src={props.authedUser.avatarURL}
                   alt="avatar icon"
              />
            </div>
            <div className="buttons left-margin">
              <button
                className="button is-primary"
                onClick={handleLogout}
              >
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

const wrapRouter = withRouter(NavBar)

const mapStateToProps = ({authedUser}) => ({
  authedUser
})

export default connect(mapStateToProps)(wrapRouter)