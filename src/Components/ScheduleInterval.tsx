import React, { useRef, useState } from 'react'
import { ScheduleJob } from './ScheduleJob';
import { ScheduleIntervalProps } from '../types';

export const ScheduleInterval = (props: ScheduleIntervalProps) => {
  const { startTime, jobs, renderHover, boxNumber } = props;
  const ref = useRef(null);
  const calcNudge = (jobDate: Date, shifted: Boolean): number => {
    const startDate = new Date(startTime);
    if(jobDate.getDay() - startDate.getDay() > 0) return 0.33; 
    const nudge = 100*(jobDate.getTime() - startTime)/7200000; 
    return nudge;
  }
  return (
    <div ref={ref} className='home-schedule-interval'>
      {jobs.map((job: object): React.ReactElement => {
        return <ScheduleJob renderHover={renderHover} nudge={calcNudge(job.time, job.shifted)} color={'lightyellow'}
        name={job.name} time={job.time} color={job.color} shifted={job.shifted} hovered={job.hovered} opacity={job.opacity} boxNumber={boxNumber} boxWidth={ref.current.clientWidth}/>
      })}
    </div>
  )
}
