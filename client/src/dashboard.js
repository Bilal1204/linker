import React, {useContext, useEffect, useState} from 'react'
import LinkBox from './components/LinkBox'
import UserHeader from './components/UserHeader'
import { toast } from 'react-toastify'
import UserContext from './context/userContext'

const Dashboard = () => {

    const [data, setData] = useState({})
    const {setUserData} = useContext(UserContext)

    useEffect(() => {
        if(!localStorage.getItem('LinkTreeToken')) return window.location.href = '/'
        fetch('http://localhost:8080/data/dashboard', {
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
          if(data.status === 'error') return toast.err('Some Error')
          setData(data.userData)
          setUserData(data.userData)
          localStorage.setItem('userHandle', data.userData.handle)
          // toast.success(data.message)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <>
        <div>
          <UserHeader/>
          <main>
            <section className='flex flex-row justify-center'>
              <LinkBox lbTitle='Link(s)' lbNumber={data.links} lbSvg='url' lbTheme='green'/>
            </section>
            <section></section>
          </main>
        </div>
    </>
  )
}

export default Dashboard