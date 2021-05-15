import './App.css'
import React from 'react'
import MessageForm from './MessageForm'
import io from '../../node_modules/socket.io/client-dist/socket.io.js'
import Room from './Room'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
const socket = io()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      room: '',
      rooms: [],
      nick: ''
    }
  }

  componentDidMount() {
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
        this.setState({ messages: newMessages, rooms: this.getRooms(newMessages) })
        console.log(this.state)
      })
  }

  handleSubmit(text) {
    const message = { nick: this.state.nick, room: this.state.room, text }
    console.log(message)
    socket.emit('chat message', message)
  }

  getRooms(messages) {
    console.log(messages)
    const rooms = messages.map(msg => msg.room)
    const allRooms = rooms.filter(room => room)

    const uniqrooms = Array.from(new Set(allRooms))
    return uniqrooms
  }

  render() {



    return (
      <div className='App'>
        <h1>Chatroom phase 4</h1>
        {/* <Rooms messages={this.state.messages} setRoom={(room) => this.setState({ room })} room={this.state.room} />
        <MessageForm handleSubmit={this.handleSubmit.bind(this)} />
        {this.state.messages
          .filter(msg => msg.room === this.state.room)
          .map((msg, index) => <li key={index}>{msg.text}</li>)} */}
        <Router>
          <div>
            <nav>
              <ul>
                {this.state.rooms.map((room, index) => {
                  return <li key={index}>
                    <Link to={'/room/' + room} onClick={() => {
                      this.setState({ room: room })
                    }}>{room}</Link>
                  </li>
                })}
              </ul>
            </nav>
            <Switch>
              {/* {this.state.rooms.map((room, index) => {
                <Route path={'/room/' + room}>
                  <Room messages={this.state.messages.filter(msg => msg.room === room)} />
                </Route>
              })} */}
              <Route path="/messages/:id" children={<Room room={this.state.room} messages={this.state.messages} />} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
export default App
