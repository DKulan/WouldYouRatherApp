import React from 'react'
import {Redirect} from 'react-router-dom'


class NotFound extends React.Component {
  state = {
    redirect: false
  }

  handleRedirect = () => {
    this.setState(() => ({
      redirect: true
    }))
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleRedirect()
    }, 2000)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/login'}/>
    }

    return (
      <h1>404: Not Found</h1>
    )
  }
}

export default NotFound