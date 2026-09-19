import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  return (
    <div>
      <h3>Dashboard</h3>
      <div className="d-flex gap-2">
        <Link to="/submit" className="btn btn-success">Submit Complaint</Link>
        <Link to="/my-complaints" className="btn btn-secondary">My Complaints</Link>
      </div>
    </div>
  )
}
