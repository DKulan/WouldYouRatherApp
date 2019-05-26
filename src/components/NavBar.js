import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearAuthedUser} from '../actions/users'


const NavBar = (props) => {
    const handleLogout = () => {
        props.dispatch(clearAuthedUser())
    }

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
                        <figure className="image is-32x32">
                            <img className="is-rounded padding-right image is-32x32" src={props.avatarURL}/>
                        </figure>
                        <div className="buttons">
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

const mapStateToProps = (state) => ({
    avatarURL: state.authedUser.avatarURL
})

export default connect(mapStateToProps)(NavBar)