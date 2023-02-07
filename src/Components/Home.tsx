import React, { useState } from 'react';
import '../Styles/home.css';
import { ScheduleInterval } from './ScheduleInterval';
import { JobMetrics } from '../types';


//Array containing cronjobs
// const cronjobs:Array<string> = [];
//this is array containing regular jobs
const jobs: Array<JobMetrics[]> = [];


const fetchPastJobs = async () => {
   // console.log('fetchPastJobs');
  // try {
  //   const response = await (await fetch('http://localhost:9090/api/v1/label/job_name/values')).json();
  //   const allJobsArray = response.data;
  //   for(let i = 0; i < allJobsArray.length; i++) {
  //     const response = await (await (fetch(`http://localhost:9090/api/v1/query?query={job_name="${allJobsArray[i]}"}`))).json();
  //     if(response.data.result.length !== 0) {
  //       console.log('allJobsArray: ',allJobsArray[i]);
  //       console.log('response: ',response);
  //       const metrics: JobMetrics = {};
  //       metrics.kube_job_name = allJobsArray[i];
  //       metrics.kube_job_complete = false;
  //       response.data.result.forEach((metricObj: any): void => {
  //         const property: (string | boolean) = metricObj.metric.__name__;
  //         const value: string = metricObj.value[1];
  //         if(property === "kube_job_complete") {
  //           if(value === '1') metrics[property] = true;
  //         }
  //         else metrics[property] = value;
  //       })
  //       jobs.push(metrics);
  //       console.log('jobs: ', jobs);
  //     } else {
  //       cronjobs.push(allJobsArray[i]);
  //       // console.log('this is cronjobs', cronjobs)
  //     }
  //   }
  // } catch (e) {
  //     console.log(e);
  // }

  //This is fetch for every single job
fetch('http://localhost:9090/api/v1/label/job_name/values', {
  method: 'GET',
  // body: JSON.stringify(),
  headers: {
      'Content-Type': 'application/json'
  }
}).then(data => data.json())
.then(response => {
  //this is the array of every single job
  const allJobsArray = response.data;
  // console.log(allJobsArray);

  for(let i = 0; i < allJobsArray.length; i++) {
    //This is fetch for individual jobs
    fetch(`http://localhost:9090/api/v1/query?query={job_name="${allJobsArray[i]}"}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(data => data.json())
  .then(response => {
    //check if metrics array is empty
    if(response.data.result.length !== 0){
      console.log('allJobsArray: ',allJobsArray[i]);
      console.log('response: ',response);
      const metrics: JobMetrics = {};
      metrics.kube_job_name = allJobsArray[i];
      metrics.kube_job_complete = false;
      response.data.result.forEach((metricObj: any): void => {
        const property: (string | boolean) = metricObj.metric.__name__;
        const value: string = metricObj.value[1];
        if(property === "kube_job_complete") {
          if(value === '1') metrics[property] = true;
        }
        else metrics[property] = value;
      })
      jobs.push(metrics);
      console.log('jobs: ', jobs);
    } else {
      cronjobs.push(allJobsArray[i]);
      // console.log('this is cronjobs', cronjobs)
    }
  });
  }
  });
}

// fetchPastJobs();

const fetchCronJobs = async () => {

  // const cronjobs = {
  //   crontest: {
  //     created: 
  //     info: 
  //     next_sched_time: 
  //     instances: [ {job_name: crontest-1...}, {job_name: crontest-2...}]
  //   }
  // }
  const cronjobs = {};

  // `http://localhost:9090/api/v1/query?query={cronjob=~"${name}"}`
  try {
    const response = await (await fetch("http://localhost:9090/api/v1/label/cronjob/values")).json();
    console.log('first response: ', response);
    for(let i = 0; i < response.data.length; i++) {
      const name: string = response.data[i];
      console.log('name: ', name);
      const cronjobOverview = await (await fetch(`http://localhost:9090/api/v1/query?query={cronjob="${name}"}`)).json();
      console.log('cronjob overview: ', cronjobOverview);
      
      if(cronjobOverview.data.result.length !== 0) {
        cronjobs[name] = {};
        cronjobOverview.data.result.forEach((metricObj: any): void => {
          cronjobs[name][metricObj.metric.__name__] = metricObj.value[1];
        });
        const allCronjobInstances = (await (await fetch(`http://localhost:9090/api/v1/query?query={job_name=~"${name}-.*"}`)).json()).data.result;

        const groupedMetricsByInstance: any = {};
        allCronjobInstances.forEach(instance => {
          const { __name__, job_name } = instance.metric;
          const value = instance.value[1];
          if(!groupedMetricsByInstance[job_name]) groupedMetricsByInstance[job_name] = {};
          groupedMetricsByInstance[job_name][__name__] = value;
        })

        cronjobs[name].instances = groupedMetricsByInstance;
        // allCronjobInstances.data.result.forEach()
        console.log('allCronjobInstances: ', allCronjobInstances);
      }
    }
    console.log('cronjobs: ', cronjobs);
  } catch (e) {
    console.log(e);
  }
}

fetchCronJobs();





export const Home = () => {
  const [hours, setHours] = useState(new Array(12).fill([]));
  const [jobList, setJobList] = useState([]);
  return (
    <div className='home-container'>
      <div className="home-title">
        <div><b>cluster:</b> eks-cluster-01</div>
        <div><b>namespace:</b> default</div>
      </div>
      <div className="home-schedule">
        <div className='home-schedule-active-day'>Today</div>
        {hours.map((hour: [], index: number): React.ReactElement => {
          return <ScheduleInterval startTime={index * 2}/>
        })}
      </div>
      <div className="home-job-list">
        <div className="home-job"></div>
        <div className="home-job"></div>
        <div className="home-job"></div>
        <div className="home-job"></div>
      </div>
    </div>
  )
}
