import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    try{
      const res = await API.post('/api/auth/register', form)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    }catch(err){
      alert(err.response?.data?.msg || 'Error')
    }
  }

  return (
    <div className="card p-4">
      <h3>Sign Up</h3>
      <form onSubmit={handle}>
        <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="form-control mb-2" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}
