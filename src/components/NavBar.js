import React from 'react'
import {Link} from 'react-router-dom'


const NavBar = () => {
    const authedUser = JSON.parse(localStorage.getItem('authedUser'))

    const handleLogout = () => {
        localStorage.removeItem('authedUser')
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
                        <div className="image is-32x32">
                            <img className="is-rounded image is-32x32"
                                 src={authedUser.avatarURL}
                                 alt="avatar icon"
                            />
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

export default NavBar