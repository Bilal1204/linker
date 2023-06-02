import React from 'react'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';

const Share = () => {
    const navigate  = useNavigate();
    const copyLink = () =>{
        navigator.clipboard.writeText(`https://linkers.vercel.app${window.location.pathname}`)
        toast('Copied to Clipboard')
    }

  return (
    <>
        <div className="absolute top-40 left-10 cursor-pointer p-2 z-10 bg-indigo-400 rounded-md border-indigo-600"
        onClick={copyLink}>
            <img className='w-4' src="/svg/share.svg" alt="" />
        </div>
    </>
  )
}

export default Share