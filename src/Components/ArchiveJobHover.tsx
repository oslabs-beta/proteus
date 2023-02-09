import React from 'react';
import { ScheduleJobHoverProps } from '../types';

export const ArchiveJobHover = ({name, runtime}: any) => {
 
  return (
    <div className='archive-job-hover-container'>
      <div>Name: {name}</div>
      <div>Runtime: {runtime}</div>
    </div>
  )
}
