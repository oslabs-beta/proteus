import React, { useRef, useState } from 'react';
import { ScheduleJobProps } from '../types';
import { ScheduleJobHover } from './ScheduleJobHover';

export const ScheduleJob = (props: ScheduleJobProps) => {
  const { nudge, color, name, time, renderHover } = props;
  const ref = useRef(null);
  if(name === 'tester') console.log(nudge);
  return (
    <div className='home-schedule-job-container'>
      <div ref={ref} onMouseEnter={(e) => renderHover(name, time, ref.current.offsetLeft, ref.current.offsetTop)} onMouseLeave={() => renderHover()} className='home-schedule-job' style={{left: `${nudge}%`, backgroundColor: color}}>
        <div></div>
      </div>
    </div>
  )
}
