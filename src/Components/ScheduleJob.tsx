import React, { useState } from 'react';
import { ScheduleJobProps } from '../types';
import { ScheduleJobHover } from './ScheduleJobHover';

export const ScheduleJob = (props: ScheduleJobProps) => {
  const { nudge, color, name, time, renderHover } = props;
  // const [isHovered, setIsHovered] = useState(false);
  // console.log('job name: ', name);
  return (
    <div className='home-schedule-job-container'>
      <div onMouseEnter={() => renderHover(name, time)} onMouseLeave={() => renderHover()} className='home-schedule-job' style={{left: `${nudge}%`, backgroundColor: color}}>
        <div>{name}</div>
        {/* {isHovered && <ScheduleJobHover
          time={time}
          name={name}
        />} */}
      </div>
    </div>
  )
}
