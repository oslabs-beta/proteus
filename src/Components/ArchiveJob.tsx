import React, { useState, useRef } from 'react';
import '../Styles/home.css';

  export const ArchiveJob = (props) => {
    const { metrics, renderHover } = props;
    const {
      kube_name, kube_job_complete, kube_job_created,
      kube_job_namespace, kube_job_runtime, kube_job_status_completion_time,
      kube_job_status_failed, kube_job_status_succeeded, kube_job_status_start_time
    } = metrics;
    const ref = useRef(null);
    const completion_time = kube_job_status_completion_time ? kube_job_status_completion_time.toLocaleString() : 'Failed to Complete';
    const color = completion_time != 'Failed to Complete' ? 'lightyellow' : 'lightcoral';
    return (
      <div className='archive-job-basic' style={{backgroundColor: color}} ref={ref}
      onMouseEnter={(event) => renderHover(kube_name,kube_job_runtime, ref.current.offsetLeft, ref.current.offsetTop)} 
      onMouseLeave={() => renderHover()}>
        <div>{kube_name}</div>
        <div>{kube_job_namespace}</div>
        <div>{kube_job_status_start_time?.toLocaleString()}:</div>
        <div>{completion_time}</div>
        <div>{kube_job_status_succeeded?.toString()}</div>
        </div>
      // </div>
    )
  };