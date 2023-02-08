import React from 'react';
import { ScheduleJobHoverProps } from '../types';

export const ArchiveJobHover = ({name, success}: any) => {
 
  return (
    <div className='archive-job-hover-container'>
      <div>Name: {name}</div>
      <div>Success: {success}</div>
    </div>
  )
}
