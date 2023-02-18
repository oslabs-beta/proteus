import React, { useRef, useState } from 'react';
import { ScheduleJobProps } from '../types';
import { ScheduleJobHover } from './ScheduleJobHover';

export const ScheduleJob = (props: ScheduleJobProps) => {
  const { nudge, color, name, time, renderHover, boxNumber, boxWidth, shifted, hovered, opacity } = props;
  const ref = useRef(null);
  // if(name === 'tester') console.log(nudge);
  return (
    <div className='home-schedule-job-container'>
      <div ref={ref} onMouseEnter={(e) => {console.log(name, shifted, nudge); renderHover(name, time, boxNumber * boxWidth + ref.current.offsetLeft, ref.current.offsetTop)}} onMouseLeave={() => renderHover()} className='home-schedule-job' style={{left: `${nudge}%`, backgroundColor: color, opacity}}>
        <div></div>
      </div>
    </div>
  )
}
