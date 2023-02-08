import React, { useState } from 'react'
import { ScheduleJob } from './ScheduleJob';
import { ScheduleIntervalProps } from '../types';

export const ScheduleInterval = (props: ScheduleIntervalProps) => {
  const { startTime, jobs, renderHover } = props;
  return (
    <div className='home-schedule-interval'>
      {jobs.map((job: object): React.ReactElement => {
        return <ScheduleJob renderHover={renderHover} nudge={100*(job.time.getTime() - startTime)/7200000} color={'lightyellow'}
        name={job.name} time={job.time} color={job.color}/>
      })}
    </div>
  )
}
