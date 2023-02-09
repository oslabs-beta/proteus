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

  const fetchActiveJobs = async () => {
    // const [jobMetrics, setJobMetrics] = useState([]);
    const todayJobs = {};
    let jobMetrics;
    const allJobs = await (await fetch('http://localhost:9090/api/v1/label/job_name/values')).json()
  
    for(let i = 0; i < allJobs.data.length; i++) {
      const name = allJobs.data[i];
      // console.log(name)
      jobMetrics = await (await fetch(`http://localhost:9090/api/v1/query?query={job_name="${name}", __name__="kube_job_status_failed"}[30m]`)).json();
      
      if(jobMetrics.data.result.length !== 0) {
        todayJobs[name] =jobMetrics.data.result[0];
      }
    
    }
  
    console.log(todayJobs["another-cronjob-27930255"].values)
    todayJobs["hellocron-job"].values.forEach(failedArray => {
      // console.log(failedArray)
      if(failedArray[1] == 1) {
        console.log("failed");
      } else {
        console.log("succeeded");
      }
      
    })
  
    
  
    // console.log("these are current jobs", todayJobs);
  
    
  }
  fetchActiveJobs();