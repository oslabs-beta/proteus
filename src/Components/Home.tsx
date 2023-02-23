import React, { useState, useEffect, useEffect, useDebugValue } from 'react';
import '../Styles/home.css';
import { ScheduleInterval } from './ScheduleInterval';
import { JobMetrics } from '../types';
import { HomeListJob } from './HomeListJob';
import { ScheduleJobHover } from './ScheduleJobHover';
import { ipcRenderer } from 'electron';

export const Home = () => {
  const [ PORT, setPORT ] = useState(9090);
  const [hours, setHours] = useState({ startIndex: 0, jobs: [[],[],[],[],[],[],[],[],[],[],[],[]]});
  const [cronjobs, setCronJobs] = useState([]);
  const [hover, setHover] = useState({});
  const [hoveredCronjob, setHoveredCronjob] = useState();
  const [sort, setSort] = useState({metric: "kube_cronjob_next_schedule_time", invert: 1, isMetric: 1, isName: 0});
  const [dayStart, setDayStart] = useState(findStartOfDay(Date.now()));


  function handleSort(metric: string): void {
    setSort(prevSort => {
      const newSort = {...prevSort};
      if(prevSort.metric === metric) newSort.invert *= -1;
      newSort.metric = metric;
      return newSort;
    });
  }

  function findStartOfDay(time : number): Date {
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
  
  useEffect(() => {
    // currently no next scheduled time
    const fetchCronJobs = async () => {
      try {
        const result = await window.electronAPI.fetchCronJobs();
        const generateMockJobs = (n: number): void => {
          for(let i = 0; i < n; i++) {
            const mockJob = {...result[1]};
            const now = new Date();
            now.setHours(now.getHours() - (now.getHours() % 2));
            now.setMinutes(0);
            now.setSeconds(0);
            mockJob.cronjob_name = `mockJob${i}`;
            mockJob.kube_cronjob_next_schedule_time = now.getTime()/1000;
            mockJob.kube_cronjob_next_schedule_time += Math.random() * 100000;
            result.push(mockJob);
          }
        }
        generateMockJobs(50);
        console.log('fetch: ', result);
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
      const colors = {"lightblue": false,"lightgreen": false,"lightcoral": false,"lightseagreen": false,"lightSalmon": false, "lemonChiffon": false, "paleturquoise": false,"lightpink": false, "lightgoldenrodyellow": false, "lightskyblue": false, "lightsteelblue": false, "mediumaquamarine": false, "mediumorchid": false, "mediumpurple": false, "olivedrab": false, "palevioletred": false, "peachpuff": false};
      cronjobs.forEach((cronjob: object): void => {
        const nextScheduledTime = cronjob.kube_cronjob_next_schedule_time * 1000;        
        if(nextScheduledTime >= dayStart.getTime()) {
          const getTimeBin = (date: Date): number => {
            const hour = date.getHours();
            let shift = 0;
            if(hour % 2 === 1) {
              shift = 1;
              scheduledJob.shifted = true;
            }
            return Math.floor(hour / 2) + shift;
          }
          const assignColor = () => {
            for(const color in colors) {
              if(colors[color] === false) {
                colors[color] = true;
                return color;
              }
            }
          }
          const scheduledJob = {
            name: cronjob.cronjob_name,
            time: new Date(nextScheduledTime),
            color: assignColor()
          };
          if(cronjob.cronjob_name === hoveredCronjob) scheduledJob.hovered = true;
          if(hoveredCronjob && hoveredCronjob !== cronjob.cronjob_name) scheduledJob.opacity = 0.2;

          let timeBin = getTimeBin(scheduledJob.time);
          const dayDifference = scheduledJob.time.getDate() - today.getDate();
          if((timeBin < newHours.startIndex && dayDifference === 1) || (timeBin >= newHours.startIndex && dayDifference === 0)) {
            if(timeBin === 12) timeBin = 0;
            newHours.jobs[timeBin].push(scheduledJob);
          } 
        }
      });
      setHours(newHours);
    }
    binUpcomingJobs();
  }, [cronjobs, hoveredCronjob]);

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
    else setHover({name, time, x: x + 52, y: y + 140, active: true});
  }

  const renderIntervals = (): React.ReactElement[] => {
    const intervals = [];
    let count = 0, intervalIndex = hours.startIndex;
    while(count < hours.jobs.length) {
      if(intervalIndex === hours.jobs.length) intervalIndex = 0;
      const today: Date = new Date(dayStart.getTime());
      today.setHours(intervalIndex * 2);
      intervals.push(<ScheduleInterval startTime={today.getTime()} renderHover={renderHover} jobs={hours.jobs[intervalIndex]} boxNumber={count}/>);
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
          <div className='grid-header-item' onClick={() => handleSort('cronjob_name')}>
            <div>Name</div>
            <div className="arrow-up"></div>
          </div>
          <div className='grid-header-item' onClick={() => handleSort('kube_cronjob_next_schedule_time')}>
            <div>Next</div>
            <div className="arrow-up"></div>
          </div>
          <div className='grid-header-item' onClick={() => handleSort('cronjob_interval')}>
            <div>Interval</div>
            <div className="arrow-up"></div>
          </div>
          <div className='grid-header-item' onClick={() => handleSort('kube_cronjob_created')}>
            <div>Created</div>
            <div className="arrow-up"></div>
          </div>
          <div className='grid-header-item' onClick={() => handleSort('cronjob_node')}>
            <div>Node</div>
            <div className="arrow-up"></div>
          </div>
        </div>
        <div className="home-job-list-inner-container">
          {cronjobs.filter(cronjob => cronjob.kube_cronjob_spec_suspend === false).sort((cronjob1, cronjob2) => sort.invert * (cronjob1[sort.metric] - cronjob2[sort.metric])).concat(...cronjobs.filter(cronjob => cronjob.kube_cronjob_spec_suspend === true)).map((cronjob: object): React.ReactElement => {
            return <HomeListJob name={cronjob.cronjob_name} nextScheduledDate={new Date(cronjob.kube_cronjob_next_schedule_time * 1000)} setHoveredCronjob={setHoveredCronjob} isHovered={hover.name === cronjob.cronjob_name} createdDate={new Date(cronjob.kube_cronjob_created * 1000)} interval={cronjob.cronjob_interval} node={cronjob.cronjob_node} isActive={cronjob.kube_cronjob_status_active} isSuspended={cronjob.kube_cronjob_spec_suspend}/>;
          })}
        </div>
      </div>
      {hover.active && <ScheduleJobHover name={hover.name} time={hover.time} x={hover.x} y={hover.y}/>}
    </div>
  )
}

module.exports = { Home };
