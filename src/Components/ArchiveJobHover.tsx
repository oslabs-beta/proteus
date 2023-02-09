import React from 'react';
import { ScheduleJobHoverProps } from '../types';

export const ArchiveJobHover = ({name, runtime, x, y}: any) => {

  return (
    <div style={{left: x, top: y}} className='archive-job-hover-container'>
      <div><b>Name: </b>{name}</div>
      {/* is this seconds or minutes? */}
      <div><b>Runtime (seconds): </b>{runtime/1000}</div>
    </div>
  )
}
