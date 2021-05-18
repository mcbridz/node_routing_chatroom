import React, { useState } from 'react'

function Login(props) {
    let setNick = props.setNick
    const [username, setUsername] = useState('')
    const handleChange = (evt) => {
        let input = evt.target.value
        setUsername(input)
    }
    const handleSubmit = (evt) => {
        console.log('Logging in: ' + username)
        evt.preventDefault()
        setNick(username)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" onChange={handleChange} />
            <button type="submit">Log-In</button>
        </form>
    )
}

export default Login
