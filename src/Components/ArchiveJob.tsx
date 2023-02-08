import React, { useState } from 'react';
import '../Styles/home.css';


export const ArchiveJob = (props) => {
    const { name } = props;
    return (
      <div className='archive-job-all'>{props.value}</div>
    )
  }