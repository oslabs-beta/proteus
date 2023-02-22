import React, { useState, useRef, useContext } from 'react';
import '../Styles/home.css';
import { ThemeContext } from '../ThemeContext';

  export const ArchiveJob = (props) => {
    const theme = useContext(ThemeContext);
    const { metrics, renderHover } = props;
    const {
      kube_name, kube_job_complete, kube_job_created,
      kube_job_namespace, kube_job_runtime, kube_job_status_completion_time,
      kube_job_status_failed, kube_job_status_succeeded, kube_job_status_start_time,
      node, instance, cronjob_name
    } = metrics;
    const ref = useRef(null);
    const completion_time = kube_job_status_completion_time ? kube_job_status_completion_time.toLocaleString() : 'Failed to Complete';
    const runtime = completion_time !== 'Failed to Complete' ? kube_job_runtime : 'Failed to Complete';
    const color = completion_time != 'Failed to Complete' ? theme.bgListJob : 'lightcoral';
    return (
      <div className='archive-job-basic' style={{backgroundColor: color, color: theme.textPrimary}} ref={ref}
      onMouseEnter={(event) => renderHover(kube_name, runtime, node, instance, cronjob_name, ref.current.offsetLeft, ref.current.offsetTop)} 
      onMouseLeave={() => renderHover()}>
        <div style={{height:'45px', display: 'flex', alignItems: 'center'}}>{kube_name}</div>
        <div>{kube_job_namespace}</div>
        <div>{kube_job_status_start_time?.toLocaleString()}</div>
        <div>{completion_time}</div>
        <div>{kube_job_status_succeeded?.toString()}</div>
        </div>
      // </div>
    )
  };