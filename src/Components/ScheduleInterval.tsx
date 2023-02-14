import React, { useRef, useState } from 'react'
import { ScheduleJob } from './ScheduleJob';
import { ScheduleIntervalProps } from '../types';

export const ScheduleInterval = (props: ScheduleIntervalProps) => {
  const { startTime, jobs, renderHover, boxNumber } = props;
  const ref = useRef(null);
  const calcNudge = (jobDate: Date): number => {
    function diffInDays(date1, date2) {
      const diff = Math.abs(date1.getTime() - date2.getTime());
      return diff / (1000 * 60 * 60 * 24);
    }
    
    const startDate = new Date(startTime);
    // console.log('diff' ,diffInDays(startDate, jobDate));
    // console.log(startDate);
    if(jobDate.getDay() - startDate.getDay() > 0) return 0.33; 
    return 100*(jobDate.getTime() - startTime)/7200000;
  }
  return (
    <div ref={ref} className='home-schedule-interval'>
      {jobs.map((job: object): React.ReactElement => {
        return <ScheduleJob renderHover={renderHover} nudge={calcNudge(job.time)} color={'lightyellow'}
        name={job.name} time={job.time} color={job.color} boxNumber={boxNumber} boxWidth={ref.current.clientWidth}/>
      })}
    </div>
  )
}
