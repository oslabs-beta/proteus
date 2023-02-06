import React, { useState } from 'react'
import { ScheduleJob } from './ScheduleJob';
import { ScheduleIntervalProps } from '../types';

export const ScheduleInterval = (props: ScheduleIntervalProps) => {
  const { startTime } = props;
  const [jobs, setJobs] = useState([{startTime: startTime + 0.6, color: 'lightblue'}, {startTime: startTime, color: 'lightgreen'}, {startTime: startTime + 1.5, color: 'lightyellow'}, {startTime: startTime + .3, color: 'lightcoral'}, {startTime: startTime + 1.2, color: 'lightseagreen'}]);
  return (
    <div className='home-schedule-interval'>
      {jobs.map(job => {
        return <ScheduleJob nudge={100*(job.startTime - startTime)/2} color={job.color}/>
      })}
      <div className='home-schedule-interval-display'>{startTime}</div>
    </div>
  )
}
