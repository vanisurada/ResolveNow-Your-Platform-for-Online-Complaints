import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    try{
      const res = await API.post('/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    }catch(err){
      alert(err.response?.data?.msg || 'Error')
    }
  }

  return (
    <div className="card p-4">
      <h3>Login</h3>
      <form onSubmit={handle}>
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="form-control mb-2" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
