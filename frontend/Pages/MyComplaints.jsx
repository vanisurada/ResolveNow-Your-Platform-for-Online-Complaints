import React, { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'

export default function MyComplaints(){
  const [complaints, setComplaints] = useState([])

  useEffect(()=>{
    axios.get('/api/complaints').then(res => {
  setComplaints(res.data.complaints); 
});

  },[])

  return (
    <div>
      <h3>My Complaints</h3>
      {complaints.map(c=> (
        <div key={c._id} className="card p-3 mb-2">
          <h5>{c.title} <small className="text-muted">({c.status})</small></h5>
          <p>{c.description}</p>
          <Link to={`/chat/${c._id}`} className="btn btn-sm btn-outline-primary">Open Chat</Link>
        </div>
      ))}
    </div>
  )
}
