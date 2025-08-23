import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/QuickBlog-Assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const {navigate,token}=useAppContext();
  return (
    <div className='flex items-center justify-between py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer'>
      <img src={assets.logo} alt="logo" className='w-32 sm:w-44'/>
      {/* <h3 onClick={()=>navigate('/')} className='text-2xl font-bold text-primary'>Blogify</h3> */}
      <button onClick={()=>navigate("/admin")} className=' flex gap-2 font-semibold bg-primary text-white py-2.5 px-8.5 rounded-full text-sm hover:scale-80'>{`${token ? "Dashboard" :"Login"}`}
        <img src={assets.arrow} alt="arrow" className='w-3' />
      </button>
    </div>
  )
}

export default Navbar
