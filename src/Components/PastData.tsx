import React, {useState} from "react";
import { PastJobMetrics } from '../types';

// export type PastJobMetrics = {
//   kube_job_namespace?: string, 
//   kube_job_name?: string, 
//   kube_job_runtime?: string, 
//   kube_job_status?: string, 
//   kube_job_details?: any
// }

// nest inside a Functional Component
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
        })
        setPastJobsObject(pastJobsObject[jobs[i]] = pJO)
      }

    } catch (err) { console.log(err); }
  }
  console.log('PJO: ', pastJobsObject);
}
