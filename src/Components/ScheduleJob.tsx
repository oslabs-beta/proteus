import React, { useState } from 'react';
import { ScheduleJobProps } from '../types';
import { ScheduleJobHover } from './ScheduleJobHover';

export const ScheduleJob = (props: ScheduleJobProps) => {
  const { nudge, color, name, time, renderHover } = props;
  return (
    <div className='home-schedule-job-container'>
      <div onMouseEnter={() => renderHover(name, time)} onMouseLeave={() => renderHover()} className='home-schedule-job' style={{left: `${nudge}%`, backgroundColor: color}}>
        <div>{name}</div>
      </div>
    </div>
  )
}
