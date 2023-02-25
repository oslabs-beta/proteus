import { React } from 'react';
import { Features } from '/src/components/Features.jsx';
import { Team } from '/src/components/Team.jsx';
import { Contact } from '/src/components/Contact.jsx';

export const Home = () => {
  return (
    <div>
      <div className=" pt-36 mt-100 w-full">
        <div className='p-5 text-black z-[2] text-center w-full flex flex-col justify-center items-center'>
          <h2 id="proteus-logo" className='mt-32 mb-10 max-w-[750px] shadow-white shadow-2xl'><img src="src/assets/PROTEUS3.png" alt="Logo"/></h2>
          <p className=" text-xl text-black/60">Track your Kubernetes Jobs and Cronjobs</p>
          <button onClick={() => window.location.href = 'https://github.com/oslabs-beta/proteus'} id='proteus-button'>Get Proteus</button>
        </div>
      </div>
      <div>
        <Features />
      </div>
      <div id={'team'}>
        <Team />
      </div>
      <div id={'contact'}>
        <Contact />
      </div>
    </div>
  )
};