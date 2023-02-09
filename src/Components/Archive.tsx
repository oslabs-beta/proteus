import React, { useState, useEffect } from 'react';
import '../Styles/archive.css';
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

<<<<<<< HEAD
  //  NEW FETCH BUT CURRENTLY RETURNING EMPTY OBJECT

  // const met1 = /kube_job_status_active|kube_job_status_succeeded/;
  // const met2 = /kube_job_complete|kube_job_failed/;
  // const met3 = /kube_job_created|kube_job_status_completion_time|kube_job_status_start_time/;
  // const PORT = 9090;
  
  // useEffect(() => {
  //   fetchingPastJobs(allJobNamesArray, timeRange)
  // }, [allJobNamesArray, timeRange]);  


  // const fetchingPastJobs = async (jobs, time) => {
  //   for (let i = 0; i < jobs.length; i++) {
  //     try {
  //       const pJO = {}
  //       const response = await (await fetch(`http://localhost:${PORT}/api/v1/query?query={job_name="${jobs[i]}"}[${time}]`)).json();
  //       if (response.data.result.length > 0) {
  //         response.data.result.forEach(metricObj => {
  //           const metricName = metricObj.metric.__name__;
  //           const value = metricObj.values[metricObj.values.length - 1][1];
  //           if (!pJO['kube_job_namespace']) pJO['kube_job_namespace'] = metricObj.metric.namespace;
  //           if (met1.test(metricName)) {
  //             if (value === '1') {
  //               pJO[metricName] = true;
  //             } else pJO[metricName] = false;
  //           } 
  //           if (met2.test(metricName) && value === '1') {
  //             pJO[metricName] = metricObj.metric.condition;
  //           }
  //           if (met3.test(metricName)) {
  //               pJO[metricName] = new Date((value) * 1000);
  //           } 
  //           if (metricName === 'kube_job_status_failed' && value === '1') {
  //               pJO[metricName] = metricObj.metric.reason;
  //           }
  //           pJO['kube_job_runtime'] = (pJO['kube_job_status_completion_time'] - pJO['kube_job_status_start_time'])
  //         })
          
  //         setPastJobsObject(pastJobsObject[jobs[i]] = pJO)
  //       }

  //     } catch (err) { console.log(err); }
  //   }
  //   console.log('PJO: ', pastJobsObject);
  // }

=======
>>>>>>> dev
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
          // setHistory(oldHistory => [...oldHistory, pJO]);
          setHistory(oldHistory => [pJO, ...oldHistory]);

<<<<<<< HEAD
          // setPastJobsObject(pastJobsObject[jobs[i]] = pJO);
=======
          setPastJobsObject(pastJobsObject[jobs[i]] = pJO);
>>>>>>> dev
        }

      } catch (err) { console.log(err); }
    }
<<<<<<< HEAD
  };
  //   // push each property from the pj object into the history array
  //   // const historyArray = [];
  //   // Object.keys(pastJobsObject).forEach(key => {
  //   //   // console.log('Key: ', key)
      
  //   //   historyArray.push({[key]: pastJobsObject[key]})
  //   // });
  //   // console.log('HISTORY ARRAY: ', historyArray)
  //   // console.log('History Array: ', history)
  // }
=======
    // push each property from the pj object into the history array
    // const historyArray = [];
    // Object.keys(pastJobsObject).forEach(key => {
    //   // console.log('Key: ', key)
      
    //   historyArray.push({[key]: pastJobsObject[key]})
    // });
    // console.log('HISTORY ARRAY: ', historyArray)
    // console.log('History Array: ', history)
  }
>>>>>>> dev

  const renderHover = (name, runtime, x, y): void => {
    if(!name) setHover({...hover, active:false});
    else setHover({name, runtime, x: x+250, y: y-70, active: true});
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
          <div className="archive-job-list">
           {archiveArray}
          </div>
        </div>
        {hover.active && <ArchiveJobHover name={hover.name} runtime={hover.runtime} x={hover.x} y={hover.y}/>}
      </div>
    )
  }


  // color coding => job is white, cronjob is light green
