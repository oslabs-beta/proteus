import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


export const Team = () => {

  return (
    <div className="md:px-24">
      <div className="flex flex-col justify-center max-w-[1248px] mx-auto md:p-4 w-full mt-40 mb-20"> 
        <div className='flex flex-col items-center'>
          <p className='text-5xl font-bold border-b-[3px] border-y-pink pt-20'>Our Team</p>
          <p className='md:text-2xl text-center text-gray-pink py-8'>Meet the engineers behind Proteus</p>
        </div>
        <div className='w-full flex justify-center flex-wrap gap-10 text-center md:p-8 '>
          <div className="flex flex-col justify-center align-center bg-gradient-to-t from-pink to-white w-72 h-96 shadow-md rounded-md  p16 pt-10 shadow-gray-pink hover:scale-110 duration-500 cursor-pointer items-center">
            <div id='team-circles'>
              <img src="src/assets/bianca2.png" alt="image_bianca" className='w-36 h-36 rounded-full shadow-2xl shadow-white self-center mb-12 border-2 border-white' ></img>
            </div>
            <p className="text-2xl">Bianca Hua</p>
            <p className="text-1xl py-1">Software Engineer</p>
            <div className="flex flex-row justify-between gap-6 py-3">
              <a className="hover:scale-110 duration-300" href="https://github.com/biancahua"><FontAwesomeIcon size='2x' icon={faGithub} /></a>
              <a className="hover:scale-110 duration-300" href="https://www.linkedin.com/in/biancahua"><FontAwesomeIcon size='2x' icon={faLinkedinIn} /></a>
            </div>
          </div>
          <div className="flex flex-col justify-center align-center bg-gradient-to-t from-pink to-white w-72 h-96 shadow-md rounded-md  p16 pt-10 shadow-gray-pink hover:scale-110 duration-500 cursor-pointer items-center">
            <div id='team-circles'>
              <img src="src/assets/eddy2.png" alt="image_eddy" className='w-36 h-36 rounded-full shadow-2xl shadow-white self-center mb-12 border-2 border-white' ></img>
            </div>
            <p className="text-2xl">Eddy Kaggia</p>
            <p className="text-1xl py-1">Software Engineer</p>
            <div className="flex flex-row justify-between gap-6 py-3">
              <a className="hover:scale-110 duration-300" href="https://github.com/eddykaggia"><FontAwesomeIcon size='2x' icon={faGithub} /></a>
              <a className="hover:scale-110 duration-300" href="https://www.linkedin.com/in/eddy-kaggia/"><FontAwesomeIcon size='2x' icon={faLinkedinIn} /></a>
            </div>
          </div>
          <div className="flex flex-col justify-center align-center bg-gradient-to-t from-pink to-white w-72 h-96 shadow-md rounded-md  p16 pt-10 shadow-gray-pink hover:scale-110 duration-500 cursor-pointer items-center">
            <div id='team-circles'>
              <img src="src/assets/mark2.png" alt="image_mark" className='w-36 h-36 rounded-full shadow-2xl shadow-white self-center mb-12 border-2 border-white' ></img>
            </div>
            <p className="text-2xl">Mark Bryan</p>
            <p className="text-1xl py-1">Software Engineer</p>
            <div className="flex flex-row justify-between gap-6 py-3">
              <a className="hover:scale-110 duration-300" href="https://github.com/mbryan13"><FontAwesomeIcon size='2x' icon={faGithub} /></a>
              <a className="hover:scale-110 duration-300" href="https://www.linkedin.com/in/marklawbryan"><FontAwesomeIcon size='2x' icon={faLinkedinIn} /></a>
            </div>
          </div>
          <div className="flex flex-col justify-center align-center bg-gradient-to-t from-pink to-white w-72 h-96 shadow-md rounded-md  p16 pt-10 shadow-gray-pink hover:scale-110 duration-500 cursor-pointer items-center">
            <div id='team-circles'>
              <img src="src/assets/matt2.png" alt="image_matt" className='rotate-45 w-36 h-36 rounded-full shadow-2xl shadow-white self-center mb-12 border-2 border-white' ></img>
            </div>
            <p className="text-2xl">Matt Henely</p>
            <p className="text-1xl py-1">Software Engineer</p>
            <div className="flex flex-row justify-between gap-6 py-3">
              <a className="hover:scale-110 duration-300" href="https://github.com/mhenely"><FontAwesomeIcon size='2x' icon={faGithub} /></a>
              <a className="hover:scale-110 duration-300" href="https://www.linkedin.com/in/matt-henely"><FontAwesomeIcon size='2x' icon={faLinkedinIn} /></a>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}



{/* <div class="w-full flex justify-center flex-wrap gap-10 text-center p-8 text-gray-700"><div class="flex flex-col justify-center align-center bg-gradient-to-t from-indigo-500/40 to-white w-72 h-96 shadow-md rounded-md border p-16 pt-10 shadow-[#3f51b5]/60 hover:scale-110 duration-500 cursor-pointer"><img alt="henry" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhenry.1bd1d2ad.jpg&amp;w=640&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhenry.1bd1d2ad.jpg&amp;w=1080&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhenry.1bd1d2ad.jpg&amp;w=1080&amp;q=75" width="512" height="512" decoding="async" data-nimg="1" class="rounded-full shadow-2xl self-center mb-12 w-28 h-28 border-2" loading="lazy" style="color:transparent"><p class="text-2xl">Henry Halse</p><p class="text-lg">Software Engineer</p></div><div class="flex flex-col justify-center align-center bg-gradient-to-t from-indigo-500/40 to-white w-72 h-96 shadow-md rounded-md border p-16 pt-10 shadow-[#3f51b5]/60 hover:scale-110 duration-500 cursor-pointer"><img alt="yarden" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fyarden.6c8a4239.png&amp;w=640&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fyarden.6c8a4239.png&amp;w=1080&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fyarden.6c8a4239.png&amp;w=1080&amp;q=75" width="512" height="512" decoding="async" data-nimg="1" class="rounded-full shadow-2xl self-center mb-12 w-28 h-28 border-2" loading="lazy" style="color:transparent"><p class="text-2xl">Yarden Edry</p><p class="text-lg">Software Engineer</p></div><div class="flex flex-col justify-center align-center bg-gradient-to-t from-indigo-500/40 to-white w-72 h-96 shadow-md rounded-md border p-16 pt-10 shadow-[#3f51b5]/60 hover:scale-110 duration-500 cursor-pointer"><img alt="emad" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Femad.853ab5bb.jpg&amp;w=640&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Femad.853ab5bb.jpg&amp;w=1080&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Femad.853ab5bb.jpg&amp;w=1080&amp;q=75" width="512" height="512" decoding="async" data-nimg="1" class="rounded-full shadow-2xl self-center mb-12 w-28 h-28 border-2" loading="lazy" style="color:transparent"><p class="text-2xl">Emad Kalali</p><p class="text-lg">Software Engineer</p></div><div class="flex flex-col justify-center align-center bg-gradient-to-t from-indigo-500/40 to-white w-72 h-96 shadow-md rounded-md border p-16 pt-10 shadow-[#3f51b5]/60 hover:scale-110 duration-500 cursor-pointer"><img alt="uma" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuma1.7ddea8bc.jpg&amp;w=640&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuma1.7ddea8bc.jpg&amp;w=1080&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuma1.7ddea8bc.jpg&amp;w=1080&amp;q=75" width="512" height="512" decoding="async" data-nimg="1" class="rounded-full shadow-2xl self-center mb-12 w-28 h-28 border-2" loading="lazy" style="color:transparent"><p class="text-xl">Uma Sowmiyamurthy</p><p class="text-lg">Software Engineer</p></div><div class="flex flex-col justify-center align-center bg-gradient-to-t from-indigo-500/40 to-white w-72 h-96 shadow-md rounded-md border p-16 pt-10 shadow-[#3f51b5]/60 hover:scale-110 duration-500 cursor-pointer"><img alt="wendy" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwendy.138cdac9.jpg&amp;w=640&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwendy.138cdac9.jpg&amp;w=1080&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwendy.138cdac9.jpg&amp;w=1080&amp;q=75" width="512" height="512" decoding="async" data-nimg="1" class="rounded-full shadow-2xl self-center mb-12 w-28 h-28 border-2" loading="lazy" style="color:transparent"><p class="text-2xl">Wendy Kuo</p><p class="text-lg">Software Engineer</p></div></div> */}