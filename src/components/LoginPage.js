import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'


class LoginPage extends React.Component {
    render() {
        return (
            <section className="hero is-alt is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <article className="card is-rounded">
                            <div className="card-content">
                                <h1 className="title">
                                    Welcome to the Would You Rather App!
                                </h1>
                                <h2>Sign in to continue</h2>
                                <div className="field">
                                    <div className="dropdown">
                                        <div className="dropdown-trigger">
                                            <button className="button" aria-haspopup="true"
                                                    aria-controls="dropdownmenu">
                                                <span>Dropdown button</span>
                                                <span className="icon is-small">
                                                    <FontAwesomeIcon icon={faAngleDown}/>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <p className="control">
                                        <button className="button is-primary is-medium is-fullwidth">
                                            Login
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        )
    }
}

export default LoginPage