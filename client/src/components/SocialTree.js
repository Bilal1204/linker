import React from 'react'

const SocialTree = ({socials}) => {
    const {facebook, instagram, youtube, twitter, linkedin, github} = socials
    // console.log({socials})
  return (
    <>
        <div className="socials flex flex-row justify-center">
            <a className='bg-white rounded-full p-2' target='_blank' href={`https://facebook.com/${facebook}`}>
            <img className='w-6' src="/svg/facebook.svg" alt="" />
            </a>
            <a className='bg-white rounded-full p-2' target='_blank' href={`https://instagram.com/${instagram}`}>
            <img className='w-6' src="/svg/instagram.svg" alt="" />
            </a>
            <a className='bg-white rounded-full p-2' target='_blank' href={`https://youtube.com/${youtube}`}>
            <img className='w-6' src="/svg/youtube.svg" alt="" />
            </a>
        <a className='bg-white rounded-full p-2' target='_blank' href={`https://twitter.com/${twitter}`}>
            <img className='w-6' src="/svg/twitter.svg" alt="" />
            </a>
        <a className='bg-white rounded-full p-2' target='_blank' href={`https://linkedin.com/in/${linkedin}`}>
            <img className='w-6' src="/svg/linkedin.svg" alt="" />
            </a>
        <a className='bg-white rounded-full p-2' target='_blank' href={`https://github.com/${github}`}>
            <img className='w-6' src="/svg/github.svg" alt="" />
            </a>
        </div>
    </>
  )
}

export default SocialTree