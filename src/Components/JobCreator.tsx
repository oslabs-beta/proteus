import React, { useState, useEffect } from 'react';
import '../Styles/archive.css';
import { JobForm } from './JobForm';
import { CronJobForm } from './CronJobForm';



export const JobCreator = () => {

  // useEffect(() => {
  // })

  

  // maybe move handleSubmit here to drill down to JobForm and CronJobForm
  // const handleSubmit = (e, kind: string) => {
  //   e.preventDefault();

  //   alert(`submitted ${kind} form`)
  // }

  // handleSubmit={handleSubmit}

  return (

    <div className="job_creator_outer">
      <div className="job_creator_inner">
        <JobForm />
        {/* <CronJobForm /> */}
      </div>
    </div>

  )
}