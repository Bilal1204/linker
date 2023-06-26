import UserHeader from '../components/UserHeader'
import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import url from '../url'

const Links = () => {

  const navigate = useNavigate();

  const [links,setLinks] = useState([{url : '',title : ''}])
  const [title, setTitle] = useState('');

  const handleChange =(i,field, value) =>{
      const updatedLinks = [...links]
      const linkToupdate = {...updatedLinks[i], [field]: value}
      updatedLinks[i] = linkToupdate
      setLinks(updatedLinks)
  }

  const handleAddLink =  () =>{
    setLinks([...links, {url : '', title : ''}]);
  }

  const handleRemoveLink = (i) =>{
    const updatedLinks = [...links]
    updatedLinks.splice(i,1);
    setLinks(updatedLinks)
  }

  const saveLinks = (e) =>{
    e.preventDefault();
    const linksArray = Object.values(links)
    const titlesArray = Object.values(title)
    const linkData = linksArray.map((link,i) =>({ link, title: titlesArray[i] }))
    fetch(`/save/links`,{
      method : 'POST',
      headers:{
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
          tokenMail : localStorage.getItem('LinkTreeToken'),
          links : linkData
      })
  }).then(res => res.json())
  .then(data =>{
    if(data.status === 'error') return toast.error(data.error)
    toast.success('Links Saved Successfully')
  })
.catch(err => toast.error(err.message))
}

  useEffect(() =>{
    if(!localStorage.getItem('LinkTreeToken')) return navigate('/')
    fetch(`/load/links`,{
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
        // console.log(data.links)
        setLinks(data.links)
    } ).catch(error => toast.error(error.message))
},[])

  return (
    <>
      <div>
        <UserHeader />
          <main>
            <section>
              <h1 className='text-center font-bold text-xl text-gray-600'>Add or Customize your Links</h1>
            </section>
            <form onSubmit={saveLinks}>
              {links.map((link, i) =>
                <div className='flex flex-row justify-evenly my-2' key={i}>
                  <label>
                    URL : 
                    <input className='outline-none border-2 px-2 py-1 ml-2' type="text" value={link.url} onChange={e => handleChange(i,'url',e.target.value)}/>
                  </label> 
                  <label>
                    TITLE:
                    <input className='outline-none border-2 px-2 py-1 ml-3' type="text" value={link.title} onChange={e => handleChange(i,'title',e.target.value)}/>
                  </label>
                  <button className='bg-indigo-500 text-white px-4 py-2 rounded-md' type='button' onClick={() => handleRemoveLink(i)}>
                  Remove Link
                  </button>
                </div>
              )}
              <div className='buttons flex flex-row gap-5 my-1'>
                <button className='bg-indigo-500 text-white px-4 py-2 rounded-md w-full' type='button' onClick={handleAddLink}>
                  Add Link
                </button>
                <button className='bg-indigo-500 text-white px-4 py-2 rounded-md w-full' type='submit'>
                  Save
                </button>
              </div>
            </form>
          </main>
      </div>
    </>
  )
}

export default Links