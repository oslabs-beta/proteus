import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline' 



export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [bgColor, setBGColor] = useState(false);
  
  const handleClick = () => setNav(!nav);

  const changeNavbar = () => {
    if (window.scrollY >= 80) setBGColor(true);
    else setBGColor(false);
  };

  window.addEventListener('scroll', changeNavbar);


  return (
    <div className={`${!bgColor ? "transparent" : "bg-pink opacity-75 text-white"} w-full my-0 mx-auto z-10 ease-in duration-300 h-[80px] drop-shadow-xl py-14 fixed`}>
      <div className='px-2 flex justify-between items-center w-full h-full'>
          <a href="/" className='w-48 flex flex-col md:visible invisible hover:scale-105 md:w-60 lg:w-72'>
            {!bgColor ? <img className="h-25" src="src/assets/PROTEUS2.png" alt="solid_proteus"></img> : <img className="h-25" src="src/assets/PROTEUS3.png" alt="solid_proteus"></img> }
          </a> 
          <ul className='text-lg hidden md:flex justify-items-end pl-24'>
            <li className='text-center hover:font-bold'><Link to='/getstarted'>Getting Started</Link></li>
            <li onClick={(e) => {e.preventDefault(); window.location.replace('/#team')}} className='text-center hover:font-bold hover:cursor-pointer'>Meet the Team</li>
            <li onClick={(e) => { e.preventDefault(); window.location.replace('/#contact')}} className='text-center hover:font-bold hover:cursor-pointer'>Contact Us</li>
            <a href='https://github.com/oslabs-beta/proteus' className='flex flex-row items-center'><li className='text-center hover:font-bold'>Updates</li></a>
          </ul>
      </div>
      <div className='md:hidden px-2 flex flex-row justify-end items-center absolute bottom-10 right-5' onClick={handleClick}>
        {!nav ? <Bars3Icon className='w-10' /> : <XMarkIcon className='w-10' />}
      </div>
      <div className="inline-block mt-14 md:hidden">
        <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 text-zinc-800 w-full px-8'}>
          <li className='border-b-2 border-zinc-300 w-full hover:font-bold hover:cursor-pointer'><Link to='/'>Home</Link></li>
          <li className='border-b-2 border-zinc-300 w-full hover:font-bold hover:cursor-pointer'><Link to='/getstarted'>Getting Started</Link></li>
          <li onClick={(e) => {e.preventDefault(); window.location.replace('/#team')}} className='border-b-2 border-zinc-300 w-full hover:font-bold hover:cursor-pointer'>Meet the Team</li>
          <li onClick={(e) => { e.preventDefault(); window.location.replace('/#contact')}} className='border-b-2 border-zinc-300 w-full hover:font-bold hover:cursor-pointer'>Contact Us</li>
          <a href='https://github.com/oslabs-beta/proteus'><li className='border-b-2 border-zinc-300 w-full hover:font-bold hover:cursor-pointer'>Updates</li></a>
        </ul>
      </div>
    </div>
  )
}

