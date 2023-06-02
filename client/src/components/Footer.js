import React from 'react'
// import Link from 'next/link'

const Footer = () => {
  return (
    <footer aria-label='site-footer' className='fixed bottom-5 left-1/2 -translate-x-1/2'>
      <a className='flex flex-row items-center' href='/' target='_blank'>
        <img src="/images/favicon.ico" alt="" />
        <h5 className='text-indigo-400 pl-3 font-bold'>Try Linktree</h5>
      </a>
    </footer>
  )
}

export default Footer