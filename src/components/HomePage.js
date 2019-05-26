import React from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'


const HomePage = (props) => {
    const {authedUser, history} = props

    if (authedUser.length === 0) {
        history.push('/login')
        return null
    } else {
        return (
            <div>
                <NavBar />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    authedUser: state.authedUser
})

export default connect(mapStateToProps)(HomePage)