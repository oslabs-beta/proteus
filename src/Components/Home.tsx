import React, { useState, useEffect, useEffect, useDebugValue } from 'react';
import '../Styles/home.css';
import { ScheduleInterval } from './ScheduleInterval';
import { JobMetrics } from '../types';
import { HomeListJob } from './HomeListJob';
import { ScheduleJobHover } from './ScheduleJobHover';
import { ipcRenderer } from 'electron';

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
      // console.log('allJobsArray: ',allJobsArray[i]);
      // console.log('response: ',response);
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
      // console.log('jobs: ', jobs);
    } else {
      // cronjobs.push(allJobsArray[i]);
      // console.log('this is cronjobs', cronjobs)
    }
  });
  }
  // console.log('jobs: ', jobs);
  });
}
// fetchPastJobs();
export const Home = () => {
  const [ PORT, setPORT ] = useState(9090);
  const [ allJobNamesArray, setAllJobNamesArray ] = useState([]);
  const [hours, setHours] = useState({ startIndex: 0, jobs: [[],[],[],[],[],[],[],[],[],[],[],[]]});
  const [cronjobs, setCronJobs] = useState({});
  const [hover, setHover] = useState({});
  const [colors, setColors] = useState({"lightblue": false,"lightgreen": false,"lightcoral": false,"lightseagreen": false,"lightSalmon": false, "lemonChiffon": false, "paleturquoise": false});
  // console.log('hours: ', hours);
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
  // console.log('cronjobs state: ', cronjobs);

  useEffect(() => {
    allJobNames();
  }, [])

  // creates an array of all existing jobs
  const allJobNames = async () => {
    try {
      const response = await (await fetch(`http://localhost:${PORT}/api/v1/label/job_name/values`)).json();
      setAllJobNamesArray(response.data);
    } catch (err) { console.log(err); }
  };


  useEffect(() => {
    const fetchCronJobs = async () => {
      try {
        const result = await window.electronAPI.fetchCronJobs();
        console.log('result: ', result);
        setCronJobs(result);
      } catch (e) { console.log(e)}
    }
    fetchCronJobs();
  },[]);

  useEffect(() => {
    const binUpcomingJobs = (): void => {
      const newHours: object = {jobs: [[],[],[],[],[],[],[],[],[],[],[],[]]};
      const today = new Date();

      newHours.startIndex = Math.floor(today.getHours()/2);

      for(const [cronjob, cronjobValue] of Object.entries(cronjobs)) {
        const nextScheduledTime = cronjobValue.kube_cronjob_next_schedule_time * 1000;
        if(nextScheduledTime >= dayStart.getTime()) {
          const getTimeBin = (date: Date): number => {
            const hour = date.getHours();
            return Math.floor(hour / 2);
          }
          const assignColor = () => {
            for(const color in colors) {
              if(colors[color] === false) {
                colors[color] = true;
                return color;
              }
            }
          }
          // console.log('after');
          const scheduledJob = {
            name: cronjob,
            time: new Date(nextScheduledTime),
            color: assignColor()
          };
          const timeBin = getTimeBin(scheduledJob.time);
          const dayDifference = scheduledJob.time.getDate() - today.getDate();
          if((timeBin < newHours.startIndex && dayDifference === 1) || (timeBin >= newHours.startIndex && dayDifference === 0)) {
            newHours.jobs[timeBin].push(scheduledJob);
          } 
        }
      }
      // console.log(newHours);
      setHours(newHours);
    }
    binUpcomingJobs();
  }, [cronjobs]);

  const createIntervalDisplay = () => {
    const times = ["12am", "2am", "4am", "6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"];
    const intervalDisplay = [];
    let count = 0, intervalIndex = hours.startIndex;
    while(count < hours.jobs.length) {
      if(intervalIndex === hours.jobs.length) intervalIndex = 0;
      intervalDisplay.push(<div className='home-schedule-interval-display'>{times[intervalIndex]}</div>);
      intervalIndex++;
      count++;
    }
    return intervalDisplay;
  }

  const renderHover = (name: string, time: number, x: number, y: number): void => {
    if(!name) setHover({active:false});
    else setHover({name, time, x: x + 49, y: y + 142, active: true});
  }

  const renderIntervals = (): React.ReactElement[] => {
    const intervals = [];
    let count = 0, intervalIndex = hours.startIndex;
    while(count < hours.jobs.length) {
      if(intervalIndex === hours.jobs.length) intervalIndex = 0;
      const today: Date = new Date(dayStart.getTime());
      today.setHours(intervalIndex * 2);
      intervals.push(<ScheduleInterval startTime={today.getTime()} renderHover={renderHover} jobs={hours.jobs[intervalIndex]}/>);
      intervalIndex++;
      count++;
    }
    // console.log('intervals: ', intervals);
    return intervals;
  }
  // add start time of specific instance
  return (
    <div className='home-container'>
      <div className="home-title">
        <div><b>cluster:</b> eks-cluster-01</div>
        <div><b>namespace:</b> default</div>
      </div>
      <div className="home-schedule-container">
        <div className='home-schedule-active-day'>Today ({getDayOfWeek(dayStart)}, {getMonth(dayStart)} {dayStart.getDate()})</div>
        <div className="home-schedule">
          {renderIntervals()}
        </div>
        <div className='home-schedule-interval-display-container'>{createIntervalDisplay()}</div>
      </div>
      <div className="home-job-list">
        <div className="home-job-list-grid home-job-list-grid-header">
          <div>Name</div>
          <div>Next</div>
          <div>Interval</div>
          <div>Created</div>
          <div>Node</div>
        </div>
        {Object.entries(cronjobs).map(([name, value]): React.ReactElement => {
          return <HomeListJob name={name} nextScheduledDate={new Date(value.kube_cronjob_next_schedule_time * 1000)} isHovered={hover.name === name} createdDate={new Date(value.kube_cronjob_created * 1000)} interval={value.interval} node={value.node} isActive={value.kube_cronjob_status_active} isSuspended={value.kube_cronjob_spec_suspend}/>;
        })}
      </div>
      {hover.active && <ScheduleJobHover name={hover.name} time={hover.time} x={hover.x} y={hover.y}/>}
    </div>
  )
}

module.exports = { Home };
