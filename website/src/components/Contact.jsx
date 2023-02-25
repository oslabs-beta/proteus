import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export const Contact = () => {
  const handleClick = () => {
    console.log('handleClick in Contact pending functionality');
    window.location.href = 'mailto:proteus.osp@gmail.com';
  };

  return (
    <div className="md:px-24 py-5">
      <div className='w-full flex flex-col justify-center items-center my-36'>
        <div className='flex flex-col justify-center items-center'>
          <p className='text-5xl font-bold border-b-[3px] border-pink'>Contact Us</p>
          <p className='md:text-2xl text-gray-pink pt-8 pb-6'>Reach out to us with any questions!</p>
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
          <button className='w-60' id="contact-btn" onClick={handleClick}>LET'S TALK</button>
        </div>
        <div className="flex flex-row justify-between gap-6 py-3 mt-1">
          <a className="hover:scale-110 duration-300" href="https://medium.com/@matt.henely8/proteus-8f3262cbedb9"><FontAwesomeIcon size='2x' icon={faMedium} /></a>
          <a className="hover:scale-110 duration-300" href="https://www.linkedin.com/company/proteus-app/"><FontAwesomeIcon size='2x' icon={faLinkedinIn} /></a>
        </div>
      </div>
    </div>
  )
}

