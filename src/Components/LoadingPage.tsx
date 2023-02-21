import React from 'react';
import '../Styles/loading-page.css';
import PuffLoader from 'react-spinners/PuffLoader';


export const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <h1 className="proteus-title" style={{fontSize: '70px'}}>Proteus</h1>
      <PuffLoader color={'green'} size={'200px'}/>
      <div style={{fontSize: '40px'}}>Loading...</div>
    </div>
  )
}
