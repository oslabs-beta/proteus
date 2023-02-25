const ArchivedJobs = require('./jobsModel');
const CronJobs = require('./cronJobsModel');
const mongoose = require('mongoose');


const fetchCronJobs = async () => {
  const newCronjobs = {};
  try {
    const response = await (await fetch(`http://${process.env.SERVICE_IP}/api/v1/label/cronjob/values`)).json();
    
    for(let i = 0; i < response.data.length; i++) {
      const name = response.data[i];
      const cronjobOverview = (await (await fetch(`http://${process.env.SERVICE_IP}/api/v1/query?query={cronjob="${name}"}`)).json()).data.result;

      if(cronjobOverview.length !== 0) {      
        for(const cronJob of cronjobOverview){
          newCronjobs.cronjob_name = cronJob.metric.cronjob;
          newCronjobs[cronJob.metric.__name__] = cronJob.value[1];
          delete newCronjobs.kube_cronjob_metadata_resource_version
          delete newCronjobs.kube_cronjob_labels
          delete newCronjobs.kube_cronjob_info
          delete newCronjobs.kube_cronjob_annotations
        }

        newCronjobs.kube_cronjob_spec_suspend === "0" ? newCronjobs.kube_cronjob_spec_suspend = false : newCronjobs.kube_cronjob_spec_suspend = true;

        newCronjobs.kube_cronjob_status_active === "0" ? newCronjobs.kube_cronjob_status_active = false : newCronjobs.kube_cronjob_status_active = true;

        newCronjobs.cronjob_node = cronjobOverview[0].metric.node;
        newCronjobs.cronjob_interval = (newCronjobs.kube_cronjob_next_schedule_time - newCronjobs.kube_cronjob_status_last_schedule_time)/60;

        const exists = await CronJobs.exists({cronjob_name: name});
        if(exists === null) await CronJobs.create(newCronjobs);
        else CronJobs.replaceOne({cronjob_name: name}, newCronjobs, null, (err, docs) => console.log(err));
      }
      
    }

    return newCronjobs;
  } catch (e) {
    console.log(e);
  }
};

const archiveFetch = () => {

    const allJobNames = async () => {
      try {
        const response = await (await fetch(`http://${process.env.SERVICE_IP}/api/v1/label/job_name/values`)).json();
        fetchingPastJobs(response.data, '5d');
        fetchCronJobs();
      } catch (err) { console.log(err); }
    };
    
    allJobNames();
    
    const fetchingPastJobs = async (jobs, time) => {
      const jobMetrics = ['kube_job_complete', 'kube_job_created', 'kube_job_status_active', 'kube_job_status_completion_time', 'kube_job_status_failed', 'kube_job_status_start_time', 'kube_job_status_succeeded', 'kube_job_owner'];
      for (let i = 0; i < jobs.length; i++) {
        
        try {
          const pJO = {};
          const response = await (await fetch(`http://${process.env.SERVICE_IP}/api/v1/query?query={job_name="${jobs[i]}"}[${time}]`)).json();
          if (response.data.result.length > 0) {
            response.data.result.forEach(metricObj => {
                if (!pJO['kube_job_namespace']) pJO['kube_job_namespace'] = metricObj.metric.namespace;
                if (metricObj.metric.__name__ === 'kube_job_complete' && metricObj.metric.condition === 'true'|| 
                  metricObj.metric.__name__ === 'kube_job_status_failed' || 
                  metricObj.metric.__name__ === 'kube_job_status_active' || 
                  metricObj.metric.__name__ === 'kube_job_status_succeeded') {
                  if (metricObj.values[metricObj.values.length - 1][1] === '1') {
                    pJO[metricObj.metric.__name__] = true;
                  } else {
                    pJO[metricObj.metric.__name__] = false;
                  }
                } 
            
                else if (metricObj.metric.__name__ === 'kube_job_created' || 
                  metricObj.metric.__name__ === 'kube_job_status_start_time') {
                    pJO[metricObj.metric.__name__] = new Date((metricObj.values[metricObj.values.length - 1][1]) * 1000);
                } 
    
                else if (metricObj.metric.__name__ === 'kube_job_owner') {
                  pJO['cronjob_name'] = metricObj.metric.owner_name;
                  pJO['node'] = metricObj.metric.node;
                  pJO['instance'] = metricObj.metric.instance;
                }
    
              if(metricObj.metric.__name__ === 'kube_job_status_completion_time') {
                pJO['kube_job_status_completion_time'] = new Date((metricObj.values[metricObj.values.length - 1][1]) * 1000);
        
              } 
            
            });
            pJO.kube_name = jobs[i];
    
            if(!pJO.kube_job_status_completion_time) {
              pJO.kube_job_status_completion_time = new Date(0);
              pJO.kube_job_runtime = -1;
            } else {
              pJO['kube_job_runtime'] = (pJO['kube_job_status_completion_time'] - pJO['kube_job_status_start_time']);
            }
            if(!pJO.kube_job_complete) pJO.kube_job_complete = false; 
                
            const exists = await ArchivedJobs.exists({kube_name: jobs[i]});
            if(exists === null) {
              await ArchivedJobs.create(pJO);
            }
        
          }
    
        } catch (err) { console.log(err); }
      }
    };
};

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
    
    setInterval(fetchCronJobs, 60000);
    setInterval(archiveFetch, 300000);
});

module.exports = { archiveFetch, fetchCronJobs }; 