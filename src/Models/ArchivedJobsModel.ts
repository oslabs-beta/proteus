const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archivedJobSchema = new Schema({ 
      kube_name : {
        type: String,
        required: true,
    },
    kube_job_created: {
        type: Date,
        required: true
    },
    kube_job_complete: {
        type:Boolean,
        required: true
    },
    kube_job_status_active: {
        type: Boolean,
        required: true
    },
    kube_job_status_completion_time: {
        type: Date,
        required: true
    },
    kube_job_status_failed: {
        type: Boolean,
        required: true
    },
    kube_job_status_start_time: {
        type: Date,
        required: true
    },
    kube_job_status_succeeded: {
        type: Boolean,
        required: true
    },
    cronjob_name: {
        type: String,
        required: false
    },
    kube_job_namespace: {
        type: String,
        required: false
    },
    node: {
        type: String,
        required: false
    },
    instance: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model('ArchivedJobs', archivedJobSchema);


