import React, {useState} from "react";

//Array containing cronjobs
const cronjobs:Array<string> = [];
//jobs
const jobs:Array<string> = [];

fetch('http://localhost:9090/api/v1/label/job_name/values', {
  method: 'GET',
  // body: JSON.stringify(),
  headers: {
      'Content-Type': 'application/json'
  }
}).then(data => data.json())
.then(response => {
  const allJobsArray = response.data;
  // console.log(allJobsArray);

  for(let i = 0; i < allJobsArray.length; i++) {
    fetch(`http://localhost:9090/api/v1/query?query={job_name="${allJobsArray[i]}"}`, {
    method: 'GET',
    // body: JSON.stringify(),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(data => data.json())
  .then(response => {
    if(response.data.result.length !== 0){
      // console.log(allJobsArray[i])
      jobs.push(response.data.result);
      console.log(jobs[0])
    } else {
      cronjobs.push(allJobsArray[i]);
      // console.log('this is cronjobs', cronjobs)
    }
  });
  }
  });

  //cronjobs