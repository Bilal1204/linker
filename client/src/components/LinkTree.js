import React from 'react'
import Card from './Card'

const LinkTree = ({data}) => {
    const {name, avatar, bio, links} = data
  return (
    <>

    <section className='relative'>
        <img className='w-20 absolute rounded-full left-1/2  -translate-x-1/2 mt-2 ' src={avatar} alt="" />
        <h2 className='text-center text-lg font-bold pt-28'>{name ? name : 'Username'}</h2>
        <p className='text-center pb-5'>{bio}</p>
        <div className='flex flex-col justify-center max-w-7xl m-auto md:my-5 w-full md:w-2/5'>
            {links.map((link, i) => 
                <Card key={i} url={link.url} title={link.title} image={link.icon}/>
            )}
        </div>
    </section>
    </>
  )
}

export default LinkTree