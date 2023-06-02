import React from 'react'

const Card = ({url,title, image}) => {
    console.log({url,title,image})
  return (
    <>
        <span className='w-full'>
            <a target='_blank' className='flex flex-row items-center p-2 rounded-xl text-white bg-indigo-400 mb-3 mx-2' href={'https://' + url}>
            <img className='bg-white rounded-full p-1 w-11 mr-5' src={image} alt="" />
            <h4 className='md:text-lg'>{title}</h4>
            </a>
        </span>
    </>
  )
}

export default Card