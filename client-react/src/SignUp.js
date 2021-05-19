import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
function SignUp(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const setNick = props.setNick
    let history = useHistory()
    const handleUsernameChange = (evt) => {
        let input = evt.target.value
        setUsername(input)
    }
    const handlePasswordChange = (evt) => {
        let input = evt.target.value
        setPassword(input)
    }
    const handleEmailChange = (evt) => {
        let input = evt.target.value
        setEmailAddress(input)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        setNick(username)
        history.push('/')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" onChange={handleUsernameChange} />
            <input type="password" placeholder="***" onChange={handlePasswordChange} />
            <input type="email" placeholder="email@domain.com" onChange={handleEmailChange} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default SignUp
