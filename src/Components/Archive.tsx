import React, { useState, useEffect } from 'react';
import '../Styles/archive.css';
import { ArchiveJob } from './ArchiveJob';
import { ArchiveJobHover } from './ArchiveJobHover';
import { Dropdown } from './Dropdown';
import { ArchivedJobMetrics } from '../types';

export const Archive = () => {
  const  [history, setHistory ] = useState([]);
  const [hasRendered, setHasRendered ] = useState(0)
  const [ hover, setHover ] = useState({});
  const archiveArray: React.ReactElement[] = [];
  const [ allJobNamesArray, setAllJobNamesArray ] = useState([]);
  const [ pastJobsObject, setPastJobsObject ] = useState({});
  const [ timeRange, setTimeRange ] = useState('2h');
  const [filter, setFilter] = useState('All');

  useEffect(() => {

    const fetchAllJobs = async (): Promise<void> => {
      try {
        const jobArray: ArchivedJobMetrics[] = await window.electronAPI.fetchAllJobs();
        // sort array here
        jobArray.sort((a: ArchivedJobMetrics, b: ArchivedJobMetrics): [] => {
          return b.kube_job_status_start_time - a.kube_job_status_start_time
        })
     
        setHistory(jobArray);
      } 
      catch (e) { 
        console.log(e)
      }
    }

    fetchAllJobs();
  },[]);

  const renderHover = (name: string, runtime: string | number, node: string, instance: string, cronjob_name: string, x: number, y: number): void => {
    if(!name) setHover({...hover, active:false});
    else setHover({name, runtime, node, instance, cronjob_name, x: x+250, y: y-70, active: true});
  }

  const onFilterChange = (input: string): void => {
    setFilter(input);
  }
console.log('TEST')
  for (let i = 0; i < history.length; i++) {
    console.log(history[i]);
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
