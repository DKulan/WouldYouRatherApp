import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearAuthedUser} from '../actions/users'
import {withRouter} from 'react-router-dom'


const NavBar = (props) => {
    const handleLogout = () => {
        props.dispatch(clearAuthedUser())
    }

    if (Object.entries(props.authedUser).length === 0) {
        props.history.push('/login')
        return null
    } else {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div id="navbarBasic" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to={'/'} className="navbar-item">Home</Link>
                        <Link to={'/'} className="navbar-item">Leader board</Link>
                        <Link to={'/'} className="navbar-item">New Question</Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="image is-32x32">
                                <img className="is-rounded image is-32x32"
                                     src={Object.values(props.authedUser.avatarURL)}/>
                            </div>
                            <div className="buttons left-margin">
                                <Link
                                    to={'/login'}
                                    className="button is-primary"
                                    onClick={handleLogout}
                                >
                                    <strong>Logout</strong>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

const wrapRouter = withRouter(NavBar)

const mapStateToProps = ({authedUser}) => ({
    authedUser
})

export default connect(mapStateToProps)(wrapRouter)