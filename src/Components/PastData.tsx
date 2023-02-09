// export type PastJobMetrics = {
//   kube_job_namespace?: string, 
//   kube_job_name?: string, 
//   kube_job_runtime?: string, 
//   kube_job_status?: string, 
//   kube_job_details?: any
// }

// const jobMetrics = ['kube_job_complete', 'kube_job_created', 'kube_job_status_active', 'kube_job_status_completion_time', 'kube_job_status_failed', 'kube_job_failed', 'kube_job_status_start_time', 'kube_job_status_succeeded'];
// const metAll = /kube_job_status_active|kube_job_status_succeeded|kube_job_complete|kube_job_failed|kube_job_created|kube_job_status_completion_time|kube_job_status_start_time|kube_job_status_failed/;

import React, {useState} from "react";
import { allJobNamesArray, PORT } from '/Home.tsx';

// nest inside a Functional Component
  const [ pastJobsObject, setPastJobsObject ] = useState({});
  const [ timeRange, setTimeRange ] = useState('2h');
  
  
  const met1 = /kube_job_status_active|kube_job_status_succeeded/;
  const met2 = /kube_job_complete|kube_job_failed/;
  const met3 = /kube_job_created|kube_job_status_completion_time|kube_job_status_start_time/;

  
  useEffect(() => {
    fetchingPastJobs(allJobNamesArray, timeRange)
  }, [allJobNamesArray, timeRange]);  


  const fetchingPastJobs = async (jobs, time) => {
    for (let i = 0; i < jobs.length; i++) {
      try {
        const pJO = {}
        const response = await (await fetch(`http://localhost:${PORT}/api/v1/query?query={job_name="${jobs[i]}"}[${time}]`)).json();
        if (response.data.result.length > 0) {
          response.data.result.forEach(metricObj => {
            const metricName = metricObj.metric.__name__;
            const value = metricObj.values[metricObj.values.length - 1][1];
            if (!pJO['kube_job_namespace']) pJO['kube_job_namespace'] = metricObj.metric.namespace;
            if (met1.test(metricName)) {
              if (value === '1') {
                pJO[metricName] = true;
              } else pJO[metricName] = false;
            } 
            if (met2.test(metricName) && value === '1') {
              pJO[metricName] = metricObj.metric.condition;
            }
            if (met3.test(metricName)) {
                pJO[metricName] = new Date((value) * 1000);
            } 
            if (metricName === 'kube_job_status_failed' && value === '1') {
                pJO[metricName] = metricObj.metric.reason;
            }
            pJO['kube_job_runtime'] = (pJO['kube_job_status_completion_time'] - pJO['kube_job_status_start_time'])
          })
          
          setPastJobsObject(pastJobsObject[jobs[i]] = pJO)
        }

      } catch (err) { console.log(err); }
    }
    console.log('PJO: ', pastJobsObject);
  }