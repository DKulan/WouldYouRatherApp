import React from 'react'
import NavBar from './NavBar'


const Vote = (props) => {
    const optionOne = Object.values(props.location.state.question.optionOne.text)
    const optionTwo = Object.values(props.location.state.question.optionTwo.text)

    return (
        <div>
            <NavBar/>
            <article className="message is-primary">
                <div className="message-header">
                    <p>Would you rather?</p>
                    <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>,
                    tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
                    gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>,
                    in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id
                    porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
                </div>
            </article>

        </div>
    )
}

export default Vote