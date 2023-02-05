import React from 'react';
import { ScheduleJobProps } from '../types';

export const ScheduleJob = (props: ScheduleJobProps) => {
  const { nudge, color } = props;
  console.log(color);
  return (
    <div className='home-schedule-job' style={{left: `${nudge}%`, backgroundColor: color}}><div>Job</div></div>
  )
}
