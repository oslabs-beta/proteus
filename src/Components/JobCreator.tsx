import React, { useState, useEffect } from 'react';
import '../Styles/createjobs.css';
import { JobTabs } from './JobTabs';


export const JobCreator = () => {

  return (
    <div className="job_creator">
      <h1>CREATE JOBS HERE</h1>
      <JobTabs />
    </div>

  )
}