import React from 'react'
import { useParams } from 'react-router-dom'

function Room(props) {
    let { room } = useParams()
    let messages = props.messages.filter((msg) => msg.room === room)
    return (
        <div>
            <h1>{room}</h1>
            {messages.map((msg) => {
                return <div>
                    <span>{msg.text}</span>
                </div>
            })}
        </div>
    )
}

export default Room
