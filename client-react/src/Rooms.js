import React from 'react'
import { useHistory } from 'react-router-dom'



export default function Rooms(props) {
  let rooms = props.rooms
  let setRoom = props.setRoom
  let history = useHistory()
  const sendTo = (evt) => {
    setRoom(evt.target.value)
    history.push('/room/' + evt.target.value)
  }

  return < select defaultValue="" onChange={sendTo}>
    <option value="">--Select a Room--</option>
    {rooms.map((room, index) => {
      return <option value={room} key={index}>
        {room}
      </option>
    })}
  </select>
  // function addRoom() {
  //   const newRoom = prompt('enter a new room name: ')
  //   setNewRoom(newRoom)
  // }
  // getRooms(messages) {
  //   console.log(messages)
  //   const rooms = messages.map(msg => msg.room)
  //   const allRooms = rooms.filter(room => room)

  //   const uniqrooms = Array.from(new Set(allRooms))
  //   return uniqrooms
  // }
  // return (
  //   <div id='room'>
  //     <button onClick={addRoom}>Add Room</button>
  //     <label htmlFor='room-select'>Change Room:</label>
  //     <select onChange={event => props.setRoom(event.target.value)} value={newRoom || props.room} id='room-select'>
  //       <option value=''>--Select a Room--</option>
  //       {getRooms(props.messages, newRoom).map(room => <option key={room} value={room}>{room}</option>)}
  //     </select>
  //   </div>
  // )
}
