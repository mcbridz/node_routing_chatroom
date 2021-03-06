import './App.css'
import React from 'react'
import MessageForm from './MessageForm'
import io from '../../node_modules/socket.io/client-dist/socket.io.js'
import Room from './Room'
import Login from './Login'
import SignUp from './SignUp'
import Rooms from './Rooms'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
const socket = io()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.setNick = this.setNick.bind(this)
    let currentPath = window.location.pathname
    let regEx = /\/room\//
    let strippedPath = currentPath.replace(regEx, "")
    this.state = {
      messages: [],
      room: strippedPath,
      rooms: [],
      nick: ''
    }
    this.setRoom = this.setRoom.bind(this)
  }
  // sendTo(newUrl) {
  //   this.props.history.push(newUrl)
  // }

  componentDidMount() {
    // const nickname = prompt('enter your nickname:')
    // this.setState({ nick: nickname })


    fetch('/messages')
      .then(res => res.json())
      .then(newMessages => {
        this.setState({ messages: newMessages, rooms: this.getRooms(newMessages) })
        // console.log(this.state)
      })
    socket.on("chat message", (data) => {
      let messages = this.state.messages
      let new_messages = [...messages, JSON.parse(data)]
      console.log(this.state.messages)
      this.setState({ messages: new_messages })
    })
  }

  handleSubmit(text, nick, room) {
    const message = { nick: nick, room: room, text: text }
    socket.emit("chat message", JSON.stringify(message))
  }

  getRooms(messages) {
    // console.log(messages)
    const rooms = messages.map(msg => msg.room)
    const allRooms = rooms.filter(room => room)

    const uniqrooms = Array.from(new Set(allRooms))
    return uniqrooms
  }

  setRoom(room) {
    console.log('Setting room to ' + room)
    this.setState({ room: room })
  }

  setNick(newNick) {
    this.setState({ nick: newNick })
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
              <div>
                <div>
                  <Link to="/login">Login</Link>
                </div>
                <div>
                  <Link to="/logout">Logout</Link>
                </div>
                <div>
                  <Link to="/signup">Sign-Up</Link>
                </div>
              </div>
              {/* <ul>
                {this.state.rooms.map((room, index) => {
                  return <li key={index}>
                    <Link to={'/room/' + room} onClick={() => {
                      console.log('Setting room to ' + room)
                      this.setState({ room: room })
                    }}>{room}</Link>
                  </li>
                })}
              </ul> */}
              <Rooms rooms={this.state.rooms} setRoom={this.setRoom} />
            </nav>
            <Switch>
              <Route path="/login">
                <Login setNick={this.setNick} />
              </Route>
              <Route path="/logout">
                <Redirect to="/login" />
              </Route>
              <Route path="/signup">
                <SignUp setNick={this.setNick} />
              </Route>
              <Route path="/room/:room" children={
                <Room
                  room={this.state.room}
                  messages={this.state.messages}
                  setRoom={(room) => this.setState({ room })} />
              } />
            </Switch>
          </div>
        </Router>
        {(!this.state.nick) ? <div></div> : <MessageForm handleSubmit={this.handleSubmit} nick={this.state.nick} room={this.state.room} />}
      </div>
    )
  }
}
export default App
