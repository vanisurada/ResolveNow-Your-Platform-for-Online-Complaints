import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'
import { io } from 'socket.io-client'

const apiUrl = import.meta.env.VITE_API_URL; 
const socket = io(apiUrl, { autoConnect: false }) 

export default function Chat(){
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{
    socket.emit('joinRoom', { complaintId: id })
    API.get(`/api/complaints/mine`).then(()=>{})
    socket.on('message', (m) => setMessages(prev => [...prev, m]))
    return () => socket.off('message')
  },[id])

  const send = async () => {
    if(!text) return
    const message = { text }
    await API.post(`/api/complaints/${id}/message`, message)
    socket.emit('message', { complaintId: id, message })
    setMessages(prev=>[...prev, { ...message, sender: 'you' }])
    setText('')
  }

  return (
    <div>
      <h4>Chat</h4>
      <div className="border p-3 mb-2" style={{height:300, overflow:'auto'}}>
        {messages.map((m,i)=>(<div key={i}>{m.sender==='you'? 'You': m.sender}: {m.text}</div>))}
      </div>
      <div className="d-flex gap-2">
        <input className="form-control" value={text} onChange={e=>setText(e.target.value)} />
        <button className="btn btn-primary" onClick={send}>Send</button>
      </div>
    </div>
  )
}
