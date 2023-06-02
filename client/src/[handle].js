import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LinkTree from './components/LinkTree';
import SocialTree from './components/SocialTree';
import Share from './components/Share';

const Handle = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({})
    const [userFound, setUserFound] = useState(false)

    const [socials, setSocials] = useState({
        facebook : '',
        instagram : '',
        youtube: '',
        twitter : '',
        linkedin : '',
        github : ''
    })

    useEffect(() =>{
        if(window.location?.pathname){
            fetch(`http://localhost:8080/get/socials${window.location.pathname}`)
            .then(res => res.json())
            .then(data => {
                if(data.status === 'error') return toast.error(data.error)
                if(data.status === 'success'){
                    setSocials(data.socials)
                }
            })
            .catch(err => console.log(err))
        }
    },[window.location.pathname])

    useEffect(() =>{
        if(window.location.pathname){
            fetch(`http://localhost:8080/get${window.location.pathname}`)
            .then(res => res.json())
            .then(data => {
                if(data.status === 'error') return toast.error(data.error)
                if(data.status === 'success'){
                    setData(data.userData)
                    setUserFound(true)
                }
            })
            .catch(err => console.log(err))
        }
    },[window.location.pathname])
  
    if(!userFound){
        return (
            <div className='flex flex-col justify-center items-center h-screen '>
                <div className="not-found px-3"></div>
                <h1 className='font-bold text-lg'>User Not Found</h1>
               <span>Create Your Own <a className='font-bold text-indigo-700' href='/apply'>LinkTree</a></span> 
            </div>
        )
    }

    return(
        <div>
            <Share />
            <LinkTree data = {data}/>
            <SocialTree socials = {socials} />
        </div>
    )
}

export default Handle