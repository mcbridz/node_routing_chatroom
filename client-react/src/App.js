import './App.css'
import React from 'react'
import Rooms from './Rooms'
import MessageForm from './MessageForm'
import io from '../../node_modules/socket.io/client-dist/socket.io.js'
const socket = io()

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      room: '',
      nick: ''
    }
  }

  componentDidMount () {
    const nickname = prompt('enter your nickname:')
    this.setState({ nick: nickname })

    socket.on('chat message', msg => {
      console.log(this.state.messages)
      this.setState({ messages: this.state.messages.concat(msg) })
      console.log('got a message')
      console.log(msg)
    })

    fetch('/messages')
      .then(res => res.json())
      .then(newMessages => {
        this.setState({ messages: newMessages })
      })
  }

  handleSubmit (text) {
    const message = { nick: this.state.nick, room: this.state.room, text }
    console.log(message)
    socket.emit('chat message', message)
  }

  render () {
    return (
      <div className='App'>
        <h1>Chatroom phase 4</h1>
        <Rooms messages={this.state.messages} setRoom={(room) => this.setState({ room })} room={this.state.room} />
        <MessageForm handleSubmit={this.handleSubmit.bind(this)} />
        {this.state.messages
          .filter(msg => msg.room === this.state.room)
          .map((msg, index) => <li key={index}>{msg.text}</li>)}
      </div>
    )
  }
}

export default App
