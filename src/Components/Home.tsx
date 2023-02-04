import React from 'react';
import '../Styles/home.css';

export const Home = () => {
  return (
    <div className='home-container'>
      <div className="home-title">
        <div><b>cluster:</b> eks-cluster-01</div>
        <div><b>namespace:</b> default</div>
      </div>
      <div className="home-schedule"></div>
      <div className="home-job-list">
        <div className="home-job"></div>
        <div className="home-job"></div>
        <div className="home-job"></div>
      </div>
    </div>
  )
}
