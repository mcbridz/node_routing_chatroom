import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
function Login(props) {
    let setNick = props.setNick
    const [username, setUsername] = useState('')
    let history = useHistory()
    const handleChange = (evt) => {
        let input = evt.target.value
        setUsername(input)
    }
    const handleSubmit = (evt) => {
        console.log('Logging in: ' + username)
        evt.preventDefault()
        setNick(username)
        history.push('/')
    }
    const goToSignUp = (evt) => {
        evt.preventDefault()
        history.push('/signup')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" onChange={handleChange} />
            <button type="submit">Log-In</button>
            <button onClick={goToSignUp}>No Account? Click Here to Sign Up!</button>
        </form>

    )
}

export default Login
