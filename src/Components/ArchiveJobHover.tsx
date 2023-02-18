import React from 'react';
import { ScheduleJobHoverProps } from '../types';

export const ArchiveJobHover = ({name, runtime, node, instance, cronjob_name, x, y}: any) => {
const run_time = runtime !== 'NaN' ? runtime/1000 : 'Did not complete'
  return (
    <div style={{left: x, top: y}} className='archive-job-hover-container'>
      <div><b>Name: </b>{name}</div>
      <div><b>Runtime (seconds): </b>{run_time}</div>
      <div><b>Cronjob: </b>{cronjob_name}</div>
      <div><b>Node: </b>{node}</div>
      <div><b>Instance: </b>{instance}</div>
    </div>
  )
}
