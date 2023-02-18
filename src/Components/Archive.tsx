import React, { useState, useEffect } from 'react';
import '../Styles/archive.css';
import { ArchiveJob } from './ArchiveJob';
import { ArchiveJobHover } from './ArchiveJobHover';
import { Dropdown } from './Dropdown';
import { ipcRenderer } from 'electron';


export const Archive = () => {
  const [history, setHistory] = useState([]);
  const [hover, setHover] = useState({});
  const archiveArray: React.ReactElement[] = [];
  const [ allJobNamesArray, setAllJobNamesArray ] = useState([]);
  const [ pastJobsObject, setPastJobsObject ] = useState({});
  const [ timeRange, setTimeRange ] = useState('2h');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const jobArray = await window.electronAPI.fetchAllJobs();
        setHistory(jobArray);
      } 
      catch (e) { 
        console.log(e)
      }
    }
    fetchAllJobs();
  },[]);

  // useEffect(() => {
  //   allJobNames();
  // }, []);

  // useEffect(() => {
  //   fetchingPastJobs(allJobNamesArray, timeRange)
  // }, [allJobNamesArray, timeRange]);
// const testArray = [];
  // creates an array of all existing jobs
  // const allJobNames = async () => {
  //   try {
  //     console.log('RUNNING ALL JOB NAMES: ');
  //     const response = await (await fetch('http://localhost:9090/api/v1/label/job_name/values')).json();
  //     testArray.push(response.data)
  //     setAllJobNamesArray(response.data);
  //   } catch (err) { console.log(err); }

  // };
  // const fetchingPastJobs = async (jobs, time) => {
  //   const jobMetrics = ['kube_job_complete', 'kube_job_created', 'kube_job_status_active', 'kube_job_status_completion_time', 'kube_job_status_failed', 'kube_job_status_start_time', 'kube_job_status_succeeded'];
  //   for (let i = 0; i < jobs.length; i++) {
  //     try {
  //       const pJO = {}
  //       const response = await (await fetch(`http://localhost:9090/api/v1/query?query={job_name="${jobs[i]}"}[${time}]`)).json();
  //       if (response.data.result.length > 0) {
  //         // console.log('test: ', response.data.result)
  //         response.data.result.forEach(metricObj => {
  //           // if (jobMetrics.includes(metricObj.metric.__name__)) {
  //             if (!pJO['kube_job_namespace']) pJO['kube_job_namespace'] = metricObj.metric.namespace;
  //             if (metricObj.metric.__name__ === 'kube_job_complete' && metricObj.metric.condition === 'true'|| 
  //               metricObj.metric.__name__ === 'kube_job_status_failed' || 
  //               metricObj.metric.__name__ === 'kube_job_status_active' || 
  //               metricObj.metric.__name__ === 'kube_job_status_succeeded') {
  //               if (metricObj.values[metricObj.values.length - 1][1] === '1') {
  //                 pJO[metricObj.metric.__name__] = true;
  //               } else pJO[metricObj.metric.__name__] = false;
  //             } else if (metricObj.metric.__name__ === 'kube_job_created' || 
  //               metricObj.metric.__name__ === 'kube_job_status_completion_time' || 
  //               metricObj.metric.__name__ === 'kube_job_status_start_time') {
  //                 pJO[metricObj.metric.__name__] = new Date((metricObj.values[metricObj.values.length - 1][1]) * 1000);
  //             } else if (metricObj.metric.__name__ === 'kube_job_owner') {
  //               // console.log(metricObj.metric.owner_name);
  //               pJO['cronjob'] = metricObj.metric.owner_name;
  //               console.log(typeof pJO['cronjob'])
  //               pJO['node'] = metricObj.metric.node;
  //               pJO['instance'] = metricObj.metric.instance;
  //             }
  //           // }
  //           pJO['kube_job_runtime'] = (pJO['kube_job_status_completion_time'] - pJO['kube_job_status_start_time']);
  //           // console.log(metricObj.metric);
            
  //           // pJO['cronjob'] = metricObj.metric._owner_name;
  //         });
  //         // console.log(jobs[i])
  //         pJO.kube_name = jobs[i];
  //       //   console.log(pJO.kube_job_status_succeeded)
  //       //   if (pJO[kube_job_status_succeeded]) {
  //       //     console.log(pJO + ' I SUCCEEDED')
  //       //   } else {
  //       //     console.log(pJO + ' I FAILED')
  //       //   }
  //         // setHistory(oldHistory => [...oldHistory, pJO]);
  //         console.log('PJO: ', pJO);
  //         setHistory(oldHistory => [pJO, ...oldHistory]);

  //         // setPastJobsObject(pastJobsObject[jobs[i]] = pJO);
  //       }

  //     } catch (err) { console.log(err); }
  //   }
  // };
  const renderHover = (name, runtime, node, instance, cronjob_name, x, y): void => {
    if(!name) setHover({...hover, active:false});
    else setHover({name, runtime, node, instance, cronjob_name, x: x+250, y: y-70, active: true});
  }

  const onFilterChange = (input: string): void => {
    setFilter(input);
  }
  
  for (let i = 0; i < history.length; i++) {
    console.log(i)
    // history[i]['kube_job_runtime'] = (history[i]['kube_job_status_completion_time'] - history[i]['kube_job_status_start_time']);
    if (filter === 'All') {
        archiveArray.push(
          <ArchiveJob metrics={history[i]} renderHover={renderHover} key={history[i].kube_name}  />
        )
    } else if (filter === 'Succeeded' && history[i].kube_job_status_succeeded) {
        archiveArray.push(
            <ArchiveJob metrics={history[i]} renderHover={renderHover} key={history[i].kube_name}  />
          )
    } else if (filter === 'Failed' && !history[i].kube_job_status_succeeded) {
        archiveArray.push(
            <ArchiveJob metrics={history[i]} renderHover={renderHover} key={history[i].kube_name}  />
          )
    } 
  }

    return (
      <div className='archive-container'>
        <div className="archive-title">
          <div><b>cluster:</b> eks-cluster-01</div>
          {/* <div><b>Job:</b> white circle</div>
          <div><b>Cronjob:</b> light green circle</div> */}
        </div>
        <div className='archive-data'>
          <div className="data-types">
            <div><b>Name:</b></div>
            <div><b>Namespace:</b></div>
            <div><b>Start Time:</b></div>
            <div><b>End Time:</b></div>
            <div><b>Success? </b></div>
          </div>
          <div className='dropdown-list'>
            <Dropdown onFilterChange={onFilterChange}/>
          </div>
          <div className="archive-job-list">
           {archiveArray}
          </div>
        </div>
        {hover.active && <ArchiveJobHover
         name={hover.name} runtime={hover.runtime} cronjob_name={hover.cronjob_name}
         node ={hover.node} instance={hover.instance} x={hover.x} y={hover.y}/>}
      </div>
    )
  }
