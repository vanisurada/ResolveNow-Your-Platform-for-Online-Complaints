import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function SubmitComplaint(){
  const [form, setForm] = useState({ title: '', description: '' })
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    try{
      await API.post('/api/complaints', form)
      navigate('/my-complaints')
    }catch(err){
      alert(err.response?.data?.msg || 'Error')
    }
  }

  return (
    <div className="card p-4">
      <h3>Submit Complaint</h3>
      <form onSubmit={handle}>
        <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <textarea className="form-control mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
