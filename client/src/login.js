import React,{useState} from 'react'
import { toast } from 'react-toastify';
import {useNavigate, Link} from "react-router-dom"
import './index.css'
import NavBar from './components/Navbar';
import url from './url'

const Login = () => {

  const navigate = useNavigate()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleLogin = (e) =>{
    e.preventDefault();
    fetch(`/api/login`,{
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({email,password})
    }).then(res => res.json())
    .then(data => {
      // console.log({data})
      if(data.status === 'Success'){
        toast.success('Logged In')
        localStorage.setItem('LinkTreeToken', data.token)
        navigate('/dashboard')
      }
      if(data.status === 'not found'){
        toast.error('User Not Found')
      }
    })
    .catch(err => console.log(err))
    setEmail('')
    setPassword('')
  }

  return (
    <>
        <NavBar/>
      <section className={"background min-h-screen flex justify-center items-center"}>
        <div className='main'>
          <div className='content bg-white border-2 px-4 py-8 rounded-2xl shadow-lg'>
            <h1 className='text-2xl font-bold text-center'>
              You are now among top Creators
            </h1>
            <p className='text-center'>Access your Dashboard</p>
            <p className='text-center py-5 font-bold text-gray-500'>Start Building your Hub</p>
            <form onSubmit={handleLogin} className='flex flex-col gap-4 text-lg'>
               <input value={email} onChange={e=>setEmail(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none' type="email" placeholder='Enter Email' required/>
               <input value={password} onChange={e=>setPassword(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none' type="password" placeholder='Set a Password' required/>
               <input className='bg-indigo-600 text-white py-2 rounded-lg cursor-pointer' type="submit" value='Login' />
            </form>
          </div>
          <h4 className='text-center font-bold pt-3 text-white'>New Here? <Link className='font-bold text-red-400' to='/apply'>Apply</Link></h4>
        </div>
      </section>
    </>
  )
}

export default Login