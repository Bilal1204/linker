import React,{useContext,useState,useEffect} from 'react'
import UserContext from '../context/userContext'
import UserHeader from '../components/UserHeader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const navigate = useNavigate();

    const {userData, setUserData} = useContext(UserContext)

    const [socials, setSocials] = useState({
        facebook : '',
        instagram : '',
        youtube: '',
        twitter : '',
        linkedin : '',
        github : ''
    })

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [avatar, setAvatar] = useState('https://cdn-icons-png.flaticon.com/128/4140/4140048.png')

    useEffect(() =>{
        if(userData){
            setName(userData.name)
            setAvatar(userData.avatar)
            setBio(userData.bio)
        }
    },[userData]) 

    const handleSocials = (e) =>{
        setSocials({
            ...socials,
            [e.target.id] : e.target.value
        })
    }

    const saveSocials = e =>{
        e.preventDefault();
        fetch(`https://linkers.vercel.app/save/socials`,{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                tokenMail : localStorage.getItem('LinkTreeToken'),
                socials : socials
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.status === 'success'){
              return toast.success('Socials Saved Successfully')
            }
            return toast.error(data.error)
        }).catch(err => toast.error('Error while Saving Data'))
    }

    const saveProfile = e =>{
        e.preventDefault();
        fetch(`https://linkers.vercel.app/save/profile`,{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                tokenMail : localStorage.getItem('LinkTreeToken'),
                name : name, bio: bio, avatar : avatar
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.status === 'success'){
              return toast.success('Profile Saved Successfully')
            }
            return toast.error(data.error)
        }).catch(err => toast.error('Error while Saving Data'))
    }

    useEffect(() =>{
        if(!localStorage.getItem('LinkTreeToken')) return navigate('/')
        fetch(`https://linkers.vercel.app/load/socials`,{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                tokenMail : localStorage.getItem('LinkTreeToken')
            })
        }).then(res => res.json())
        .then(data => {
            if(data.status === 'error') return toast.error(data.error)
            console.log(data.socials)
            setSocials(data.socials)
        } ).catch(error => toast.error(error.message))
    },[])

  return (
    <>
        <div>
            <UserHeader />
            <main>
                <section>
                    <div>
                        <div>
                        <h4 className='text-lg mb-5 font-bold text-center'>Edit Profile</h4>
                        <form onSubmit={saveProfile} className='flex flex-col justify-center items-center'>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto'>
                        <img className = 'w-6 mr-2' src="/svg/user.svg" alt=""></img>
                        <input value={name} onChange={e => setName(e.target.value)} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Edit Name' required/>
                        </span>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto'>
                        <img className = 'w-6 mr-2' src="/svg/bio.svg" alt=""></img>
                        <input value={bio} onChange={e => setBio(e.target.value)} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Edit Bio' required/>
                        </span>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto mb-10'>
                        <img className = 'w-6 mr-2' src="/svg/user.svg" alt=""></img>
                        <input value={avatar} onChange={e => setAvatar(e.target.value)} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Edit Image Link' required/>
                        <img className='w-10 rounded-full' src={avatar} alt="" />
                        </span>
                        <input className='w-32 bg-green-500 px-4 py-2 rounded-md shadow-md cursor-pointer text-white ' type="submit" value='Save Profile'/>
                        </form>
                        </div>

                        <div className='mt-14'>
                        <h4 className='text-lg mb-5 font-bold text-center'>Edit Socials</h4>
                        <form onSubmit={saveSocials} className='flex flex-col justify-center items-center'>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto'>
                        <img className = 'w-6 mr-2' src="/svg/facebook.svg" alt=""></img>
                        <input id='facebook' value={socials.facebook} onChange={handleSocials} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Enter Facebook ID' required/>
                        </span>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto'>
                        <img className = 'w-6 mr-2' src="/svg/ig.svg" alt=""></img>
                        <input id='instagram' value={socials.instagram} onChange={handleSocials} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Enter Instagram ID' required/>
                        </span>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto'>
                        <img className = 'w-6 mr-2' src="/svg/youtube.svg" alt=""></img>
                        <input id='youtube' value={socials.youtube} onChange={handleSocials} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Enter Youtube ID' required/>
                        </span>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto'>
                        <img className = 'w-6 mr-2' src="/svg/twitter.svg" alt=""></img>
                        <input id='twitter' value={socials.twitter} onChange={handleSocials} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Enter Twitter ID' required/>
                        </span>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto'>
                        <img className = 'w-6 mr-2' src="/svg/linkedin.svg" alt=""></img>
                        <input id='linkedin' value={socials.linkedin} onChange={handleSocials} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Enter LinkedIn ID' required/>
                        </span>
                        <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md mb-3 w-11/12 m-auto mb-10'>
                        <img className = 'w-6 mr-2' src="/svg/github.svg" alt=""></img>
                        <input id='github' value={socials.github} onChange={handleSocials} className=' rounded-md focus:outline-none w-full' type="text" placeholder='Enter Github ID' required/>
                        </span>
                        <input onClick={handleSocials} className='w-32 bg-green-500 px-4 py-2 rounded-md shadow-md cursor-pointer text-white ' type="submit" value='Save Socials'/>
                        </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </>
  )
}

export default Profile