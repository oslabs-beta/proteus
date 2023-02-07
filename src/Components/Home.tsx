import React, { useEffect, useState } from 'react';
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









export const Home = () => {
  const [hours, setHours] = useState(new Array(12).fill([]));
  const [cronjobs, setCronJobs] = useState({});
  console.log('hours: ', hours);
  const [jobList, setJobList] = useState([]);
  
  const findStartOfDay = (time : number): Date => {
    const date = new Date(time);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  
  function getDayOfWeek(date: Date): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  function getMonth(date: Date): string {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = date.getMonth();
    return months[monthIndex];
  }
  
  const [dayStart, setDayStart] = useState(findStartOfDay(Date.now()));
  console.log('cronjobs state: ', cronjobs);




  useEffect(() => {
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
        // console.log('first response: ', response);
        for(let i = 0; i < response.data.length; i++) {
          const name: string = response.data[i];
          // console.log('name: ', name);
          const cronjobOverview = await (await fetch(`http://localhost:9090/api/v1/query?query={cronjob="${name}"}`)).json();
          // console.log('cronjob overview: ', cronjobOverview);
          
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
            setCronJobs(cronjobs);
            // console.log('allCronjobInstances: ', allCronjobInstances);
          }
        }
        // console.log('cronjobs: ', cronjobs);
      } catch (e) {
        console.log(e);
      }
    }
    fetchCronJobs();
  },[]);

  useEffect(() => {
    const binUpcomingJobs = (): void => {
      const newHours: [][] = [[],[],[],[],[],[],[],[],[],[],[],[]];
      console.log('cronjobs: ', cronjobs);
      for(const [cronjob, cronjobValue] of Object.entries(cronjobs)) {
        console.log(cronjob);
        console.log('cronjobValue: ', cronjobValue);
        const nextScheduledTime = cronjobValue.kube_cronjob_next_schedule_time * 1000;
        if(nextScheduledTime >= dayStart.getTime()) {
          const getTimeBin = (date: Date): number => {
            const hour = date.getHours();
            console.log(date, Math.floor(hour/2));
            return Math.floor(hour / 2);
          }
          
          console.log('after');
          const scheduledJob = {
            name: cronjob,
            time: new Date(nextScheduledTime)
          };
          console.log('job: ', scheduledJob);
          newHours[getTimeBin(scheduledJob.time)].push(scheduledJob);
          console.log('upcoming: ', newHours);
        }
        setHours(newHours);
      }
    }
    binUpcomingJobs();
  }, [cronjobs]);
  return (
    <div className='home-container'>
      <div className="home-title">
        <div><b>cluster:</b> eks-cluster-01</div>
        <div><b>namespace:</b> default</div>
      </div>
      <div className="home-schedule">
        <div className='home-schedule-active-day'>Today ({getDayOfWeek(dayStart)}, {getMonth(dayStart)} {dayStart.getDate()})</div>
        {hours.map((hour: [], index: number): React.ReactElement => {
          const today: Date = new Date(dayStart.getTime());
          today.setHours(index * 2);
          return <ScheduleInterval startTime={today.getTime()} jobs={hour}/>
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
