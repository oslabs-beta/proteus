import React from 'react';
import { ScheduleJobHoverProps } from '../types';

export const ArchiveJobHover = ({name, runtime}: any) => {

  return (
    <div className='archive-job-hover-container'>
      <div><b>Name: </b>{name}</div>
      <div><b>Runtime (minutes): </b>{runtime/100}</div>
    </div>
  )
}
