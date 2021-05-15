import React from 'react'
import { useParams } from 'react-router-dom'

function Room(props) {
    let { id } = useParams();
    return (
        <div>
            {props.messages.map((msg) => {
                <span>{msg.text}</span>
            })}
        </div>
    )
}

export default Room
