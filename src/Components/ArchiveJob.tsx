import React, { useState } from 'react';
import '../Styles/home.css';

  export const ArchiveJob = (props) => {
    const { metrics, renderHover } = props;
    const {kube_name, kube_job_complete, kube_job_created, kube_job_namespace, kube_job_runtime, kube_job_status_completion_time, kube_job_status_failed, kube_job_status_succeeded, kube_job_status_start_time} = metrics;
    // console.log('Kube Metric: ', [kube_job_status_start_time])
    return (
      <div className='archive-job-basic' onMouseEnter={() => renderHover(kube_name, kube_job_runtime)} onMouseLeave={() => renderHover()}>
        <div><b>Name: </b>{kube_name}:</div>
        <div>{kube_job_runtime}:</div>
        {/* <div>{kube}</div>
        <div>{completion_time}</div>
        <div>{success}</div>
        <div>{schedulded_by}</div> */}
        </div>
      // </div>
    )
  };