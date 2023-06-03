import React,{useState} from 'react'
import { toast } from 'react-toastify';
import {useNavigate, Link} from "react-router-dom"
import './index.css'
import NavBar from './components/Navbar';


const Apply = () => {

  const navigate = useNavigate()

  const [handle,setHandle] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [category,setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false)

  const handleCategoryChange = (e) =>{
    setCategory(e.target.value)
  }
  
  const handleRegister = (e) =>{
    e.preventDefault();
    if(!category) return toast.error('Add a Category')
    //Backend
    fetch('/api/register',{
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        handle,email,password,category
      })
    }).then(res => res.json())
    .then(data => {
      if(data.status === 'Success'){
        toast('Registered')
        localStorage.setItem('LinkTreeToken' , data.token)
        setSubmitted(true)
        navigate('/')
      }
    })
    .catch(err => {
      toast.error('Try a different handle')
    }
    )
  }

  return (
    <>
        <NavBar/>
      <section className={"background min-h-screen flex justify-center items-center"}>
        <div className='main'>
          <div className='content bg-white border-2 px-4 py-8 rounded-2xl shadow-lg'>
            <h1 className='text-2xl font-bold text-center'>
              Join the top Creators
            </h1>
            <p className='text-center'>Create Linktree for your brand</p>
            <p className='text-center py-5 font-bold text-gray-500'>Start Building your Hub</p>
            <form onSubmit={handleRegister} className='flex flex-col gap-4 text-lg'>
            <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md'>
            <img className = 'w-6 mr-2' src="/svg/ig.svg" alt=""></img>
            <input value={handle} onChange={e=>setHandle(e.target.value)} className=' rounded-md focus:outline-none' type="text" placeholder='Social Media Handle' required/>
            </span>
               <input value={email} onChange={e=>setEmail(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none' type="email" placeholder='Enter Email' required/>
               <input value={password} onChange={e=>setPassword(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none' type="password" placeholder='Set a Password' required/>
               <h5 className='text-sm text-center'>Account Type</h5>
               <span className="flex">
                <label className='flex flex-row mr-3'>
                  <input type="checkbox" value='Creator' checked={category==='Creator'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Creator</p>
                </label>
                <label className='flex flex-row mr-3'>
                  <input type="checkbox" value='Agency' checked={category==='Agency'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Agency</p>
                </label>
                <label className='flex flex-row mr-3'>
                  <input type="checkbox" value='Brand' checked={category==='Brand'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Brand</p>
                </label>
               </span>
               <input className='bg-indigo-600 text-white py-2 rounded-lg cursor-pointer' type="submit" value='Apply' />
            </form>
          </div>
          <h4 className='text-center text-white font-bold pt-3'>Already Registered? <Link className='font-bold text-red-400' to='/'>Login</Link></h4>
        </div>
      </section>
    </>
  )
}

export default Apply