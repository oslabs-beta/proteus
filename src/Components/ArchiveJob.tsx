import React, { useState, useRef, useContext } from 'react';
import '../Styles/home.css';
import { ThemeContext } from '../ThemeContext';
import { ArchivedJobMetrics } from '../types';

  export const ArchiveJob = (props: ArchivedJobMetrics): React.ReactElement<ArchivedJobMetrics> => {
    const theme = useContext(ThemeContext);
    const { metrics, renderHover } = props;
    const {
      kube_name, kube_job_complete, kube_job_created,
      kube_job_namespace, kube_job_runtime, kube_job_status_completion_time,
      kube_job_status_failed, kube_job_status_succeeded, kube_job_status_start_time,
      node, instance, cronjob_name
    } = metrics;

    const handleHover = (status: string): void => {
      if(status === 'enter') {
        ref.current.style.border = `1px solid ${theme.bgListJobBorderHover}`;
        ref.current.style.filter = theme.bgListJobBrightnessHover;
      }
      else if(status === 'exit') {
        ref.current.style.border = `1px solid ${theme.borderSecondary}`;
        ref.current.style.filter = "brightness(100%)";
      }
    }


    const ref = useRef(null);
    const completion_time = kube_job_status_completion_time ? kube_job_status_completion_time.toLocaleString() : 'Failed to Complete';
    const runtime = completion_time !== 'Failed to Complete' ? kube_job_runtime : 'Failed to Complete';
    const color = kube_job_status_succeeded ? theme.bgListJob : 'rgb(80, 80, 80)';
    return (
      <div className='archive-job-basic' style={{backgroundColor: color, color: kube_job_status_succeeded ? theme.textPrimary : 'white', border: `1px solid ${theme.borderSecondary}`}} ref={ref}
      onMouseEnter={(e) => {renderHover(kube_name, runtime, node, instance, cronjob_name, e.clientX, e.clientY); handleHover('enter')}} 
      onMouseLeave={() => {renderHover(); handleHover('exit')}}>
        <div style={{height:'45px', display: 'flex', alignItems: 'center'}}>{kube_name}</div>
        <div>{kube_job_namespace}</div>
        <div>{kube_job_status_start_time?.toLocaleString()}</div>
        <div>{(completion_time.includes('1969') || completion_time.includes('1970')) ? "N/A" : completion_time }</div>
        <div>{kube_job_status_succeeded?.toString()}</div>
        </div>
    )
  };