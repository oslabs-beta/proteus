import React, { useState } from 'react';
import '../Styles/home.css';

  export const ArchiveJob = (props) => {
    const { value, renderHover } = props;
  
    return (
      <div className='archive-job-basic' onMouseEnter={() => renderHover(value.name, value.success)} onMouseLeave={() => renderHover()}>
        <div>{value.name}:</div>
        <div>{value.start_time}</div>
        <div>{value.completion_time}</div>
        <div>{value.success}</div>
        <div>{value.schedulbed_by}</div>
        </div>
      // </div>
    )
  };