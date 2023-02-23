import React, { useRef, useState } from 'react';
import { ScheduleJobProps } from '../../types';

export const ScheduleJob = (props: ScheduleJobProps) => {
  const { nudge, color, name, time, renderHover, boxNumber, boxWidth, opacity } = props;
  const ref = useRef(null);
  return (
    <div className='home-schedule-job-container'>
      <div ref={ref} onMouseEnter={() => renderHover(name, time, boxNumber * boxWidth + ref.current.offsetLeft, ref.current.offsetTop)} onMouseLeave={() => renderHover()} className='home-schedule-job' style={{left: `${nudge}%`, backgroundColor: color, opacity}}>
        <div></div>
      </div>
    </div>
  )
}
