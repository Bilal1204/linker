import React,{useContext, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import UserContext from '../context/userContext';
import { toast } from 'react-toastify';
import url from '../url'

const UserHeader = () => {

    // const {name, role, avatar, handle, links} = data
    
    const navigate = useNavigate()
    
    const handleLogout = () =>{
        localStorage.removeItem('LinkTreeToken');
        localStorage.removeItem('userHandle')
        navigate('/')
    }
    
    const {userData, setUserData} = useContext(UserContext)
    const {role, avatar, handle} = userData

    useEffect(() => {
        // console.log({token : localStorage.getItem('LinkTreeToken')})
        if(localStorage.getItem('LinkTreeToken') === '') return navigate('/')
        fetch(`http://localhost:8080/data/dashboard`, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            tokenMail : localStorage.getItem('LinkTreeToken')
          })
        })
        .then(res => res.json())
        .then(data => {
          if(data.status === 'error') return toast.error(data.error)
          // setData(data.userData)
          setUserData(data.userData)
          localStorage.setItem('userHandle', data.userData.handle)
        //   toast.success(data.message)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <>
    <header className='flex flex-row justify-between items-center '>
        <div className="flex flex-col md:flex-row p-5">
            <a href='/edit/links'>
            <button className='inline-flex w-full md:w-auto px-5 py-3 text-purple-700 font-bold rounded-md mb-3 border-2 border-purple-400 md:ml-4 hover:bg-slate-200'>
                <img src="/svg/url.svg" alt="" className='w-6 mr-3'/>
                Edit Links
            </button>
            </a>
            <a href='/edit/profile'>
            <button className='inline-flex w-full md:w-auto px-5 py-3 text-purple-700 font-bold rounded-md mb-3 border-2 border-purple-400 md:ml-4 hover:bg-slate-200'>
                <img src="/svg/user.svg" alt="" className='w-6 mr-3'/>
                Edit Profile
            </button>
            </a>
        </div>
        <div className="flex flex-row">
        <a href={`/${handle}`}>
            <div className='inline-flex mr-5 text-right items-center'>
                <div className="text-xs md:text-md flex flex-col flex-wrap mr-3">
                    <span className='font-bold'>{handle}</span>
                    <span>{role} Pack</span>
                </div>
                <div className='user-img'>
                    <img className='w-10' src={avatar} alt="" />
                </div>
            </div>
    </a>
            {/* <img className='w-6 mr-5 cursor-pointer' src="/svg/notify.svg" alt="" /> */}
            <img className='w-6 mr-5 cursor-pointer' src="/svg/logout.svg" alt="" onClick={handleLogout} />
        </div>
    </header>
    </>
  )
}

export default UserHeader