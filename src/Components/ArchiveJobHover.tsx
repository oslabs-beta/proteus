import React from 'react';
import { ScheduleJobHoverProps } from '../types';

export const ArchiveJobHover = ({name, runtime, x, y}: any) => {
const run_time = runtime !== 'NaN' ? runtime/1000 : 'Did not complete'
  return (
    <div style={{left: x, top: y}} className='archive-job-hover-container'>
      <div><b>Name: </b>{name}</div>
      {/* is this seconds or minutes? */}
      <div><b>Runtime (seconds): </b>{run_time}</div>
    </div>
  )
}
