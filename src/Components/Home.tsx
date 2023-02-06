import React, { useState } from 'react';
import '../Styles/home.css';
import { ScheduleInterval } from './ScheduleInterval';

export const Home = () => {
  const [hours, setHours] = useState(new Array(12).fill([]));
  return (
    <div className='home-container'>
      <div className="home-title">
        <div><b>cluster:</b> eks-cluster-01</div>
        <div><b>namespace:</b> default</div>
      </div>
      <div className="home-schedule">
        <div className='home-schedule-active-day'>Today</div>
        {hours.map((hour: [], index: number): React.ReactElement => {
          return <ScheduleInterval startTime={index * 2}/>
        })}
      </div>
      <div className="home-job-list">
        <div className="home-job"></div>
        <div className="home-job"></div>
        <div className="home-job"></div>
        <div className="home-job"></div>
      </div>
    </div>
  )
}
