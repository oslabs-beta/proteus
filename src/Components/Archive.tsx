import React, { useState, useEffect } from 'react';
import '../Styles/home.css';
import { ArchiveJob } from './ArchiveJob';
import { ArchiveJobHover } from './ArchiveJobHover';
//  import whiteLogo from '../white-circle.svg';

// const optionsCursorTrueWithMargin = {
//   followCursor:true,
//   shiftX:20,
//   shiftY:0
// };

export const Archive = () => {
  // const [history, setHistory] = useState(new Array(20).fill(null));
  const [history, setHistory] = useState([
    // {
    //   name: 'First',
    //   start_time: 12,
    //   completion_time: 2,
    //   success: 'Yes',
    //   schedulded_by: 'Me'
    // },
    // {
    //   name: 'Second',
    //   start_time: 10,
    //   completion_time: 3,
    //   success: 'No',
    //   schedulded_by: 'Someone Else'
    // },
  ]);
  const [hover, setHover] = useState({});
  const archiveArray: React.ReactElement[] = [];
  const [ allJobNamesArray, setAllJobNamesArray ] = useState([]);
  const [ pastJobsObject, setPastJobsObject ] = useState({});
  const [ timeRange, setTimeRange ] = useState('2h')

  const jobMetrics = ['kube_job_complete', 'kube_job_created', 'kube_job_status_active', 'kube_job_status_completion_time', 'kube_job_status_failed', 'kube_job_status_start_time', 'kube_job_status_succeeded'];

  useEffect(() => {
    allJobNames();
  }, [])

  useEffect(() => {
    fetchingPastJobs(allJobNamesArray, timeRange)
  }, [allJobNamesArray, timeRange]);

  // creates an array of all existing jobs
  const allJobNames = async () => {
    try {
      const response = await (await fetch('http://localhost:9090/api/v1/label/job_name/values')).json();
      setAllJobNamesArray(response.data);
    } catch (err) { console.log(err); }
    // console.log('allJobNamesArray: ', allJobNamesArray)
  };

  const fetchingPastJobs = async (jobs, time) => {
    for (let i = 0; i < jobs.length; i++) {
      try {
        const pJO = {}
        const response = await (await fetch(`http://localhost:9090/api/v1/query?query={job_name="${jobs[i]}"}[${time}]`)).json();
        if (response.data.result.length > 0) {
          // console.log('test: ', response.data.result)
          response.data.result.forEach(metricObj => {
            if (jobMetrics.includes(metricObj.metric.__name__)) {
              if (!pJO['kube_job_namespace']) pJO['kube_job_namespace'] = metricObj.metric.namespace;
              if (metricObj.metric.__name__ === 'kube_job_complete' && metricObj.metric.condition === 'true'|| 
                metricObj.metric.__name__ === 'kube_job_status_failed' || 
                metricObj.metric.__name__ === 'kube_job_status_active' || 
                metricObj.metric.__name__ === 'kube_job_status_succeeded') {
                if (metricObj.values[metricObj.values.length - 1][1] === '1') {
                  pJO[metricObj.metric.__name__] = true;
                } else pJO[metricObj.metric.__name__] = false;
              } else if (metricObj.metric.__name__ === 'kube_job_created' || 
                metricObj.metric.__name__ === 'kube_job_status_completion_time' || 
                metricObj.metric.__name__ === 'kube_job_status_start_time') {
                  pJO[metricObj.metric.__name__] = new Date((metricObj.values[metricObj.values.length - 1][1]) * 1000);
              } 
            }
            pJO['kube_job_runtime'] = (pJO['kube_job_status_completion_time'] - pJO['kube_job_status_start_time'])
          });
          pJO.kube_name = jobs[i];
          console.log(pJO);
          setHistory(oldHistory => [...oldHistory, pJO])


          setPastJobsObject(pastJobsObject[jobs[i]] = pJO)
        }

      } catch (err) { console.log(err); }
    }
    // push each property from the pj object into the history array
    const historyArray = [];
    Object.keys(pastJobsObject).forEach(key => {
      // console.log('Key: ', key)
      
      historyArray.push({[key]: pastJobsObject[key]})
    });
    // console.log('HISTORY ARRAY: ', historyArray)
    // console.log('History Array: ', history)
  }

  const renderHover = (name, runtime): void => {
    if(!name) setHover({...hover, active:false});
    else setHover({name, runtime, active: true});
  }

  for (let i = 0; i < history.length; i++) {
    archiveArray.push(
      <ArchiveJob metrics={history[i]} renderHover={renderHover} key={history[i].kube_name}  />
    )
  }

    return (
      <div className='archive-container'>
        <div className="archive-title">
          <div><b>cluster:</b> eks-cluster-01</div>
          <div><b>Job:</b> white circle</div>
          <div><b>Cronjob:</b> light green circle</div>
        </div>
        <div className='archive-data'>
          <div className="data-types">
            <div><b>Name:</b></div>
            <div><b>Start Time:</b></div>
            <div><b>Completion Time:</b></div>
            <div><b>Success?</b></div>
            <div><b>Scheduled by: </b></div>
          </div>
          <div className="archive-job-list">
           {archiveArray}
          </div>
        </div>
        {hover.active && <ArchiveJobHover name={hover.name} runtime={hover.runtime}/>}
      </div>
    )
  }


  // color coding => job is white, cronjob is light green
