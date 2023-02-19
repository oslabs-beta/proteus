import React, { useRef, useState } from 'react'
import { ScheduleJob } from './ScheduleJob';
import { ScheduleIntervalProps } from '../types';

export const ScheduleInterval = (props: ScheduleIntervalProps) => {
  const { startTime, jobs, renderHover, boxNumber } = props;
  // console.log(boxNumber, jobs);
  const ref = useRef(null);
  const calcNudge = (jobDate: Date, shifted: boolean): number => {
    // 
    let startDate = new Date(startTime);
    if(jobDate.getDate() - startDate.getDate() > 0) {
      const hour = jobDate.getHours();
      const roundedHour = hour + (hour % 2);
      startDate = new Date(jobDate.getTime());
      startDate.setHours(roundedHour);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
    }
    const nudge = 100*(jobDate.getTime() - startDate.getTime())/7200000;
    return nudge;
  }

  function calcTimeNudge() {
    function findScheduleStart(): Date {
      const now = new Date();
      now.setHours(now.getHours() - (now.getHours() % 2));
      now.setMinutes(0);
      now.setSeconds(0);
      return now;
    }
    const start = findScheduleStart();
    const nudge = 100*(Date.now() - start.getTime())/7200000;
    return nudge;
  }

  return (
    <div ref={ref} className='home-schedule-interval'>
      {jobs.map((job: object): React.ReactElement => {
        return <ScheduleJob renderHover={renderHover} nudge={calcNudge(job.time, job.shifted)} color={'lightyellow'}
        name={job.name} time={job.time} color={job.color} shifted={job.shifted} hovered={job.hovered} opacity={job.opacity} boxNumber={boxNumber} boxWidth={ref.current.clientWidth}/>
      })}
    {boxNumber === 0 && <div style={{width: `${calcTimeNudge()}%`}} className="current-time"></div>}
    </div>
  )
}
