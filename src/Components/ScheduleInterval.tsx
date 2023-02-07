import React, { useState } from 'react'
import { ScheduleJob } from './ScheduleJob';
import { ScheduleIntervalProps } from '../types';

export const ScheduleInterval = (props: ScheduleIntervalProps) => {
  const { startTime, jobs } = props;
  // console.log('jobs: ', jobs);
  // console.log(startTime);
  // const [jobs, setJobs] = useState([{startTime: startTime + 0.6, color: 'lightblue'}, {startTime: startTime, color: 'lightgreen'}, {startTime: startTime + 1.5, color: 'lightyellow'}, {startTime: startTime + .3, color: 'lightcoral'}, {startTime: startTime + 1.2, color: 'lightseagreen'}]);
  return (
    <div className='home-schedule-interval'>
      {jobs.map((job: object): React.ReactElement => {
        console.log('job: ', job.time.getTime() - startTime);
        return <ScheduleJob nudge={100*(job.time.getTime() - startTime)/7200000} color={'lightyellow'}/>
      })}
      <div className='home-schedule-interval-display'>time</div>
    </div>
  )
}
