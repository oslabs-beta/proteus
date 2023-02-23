const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CronjobSchema = new Schema({ 
  cronjob_name: {
      type: String,
      required: true,
  },
  kube_cronjob_created: {
    type: Date,
    required: true
  },
  kube_cronjob_spec_failed_job_history_limit: {
    type: String,
    required: true
  },
  kube_cronjob_spec_successful_job_history_limit: {
    type: String,
    required: true
  },
  kube_cronjob_spec_suspend: {
    type: Boolean,
    required: true
  },
  kube_cronjob_status_active: {
    type: Boolean,
    required: true
  },
  kube_cronjob_status_last_successful_time: {
    type: Date,
    required: true
  },
  kube_cronjob_status_last_schedule_time: {
    type: Date,
    required: true
  },
  cronjob_node: {
    type: String,
    required: true
  },
  cronjob_interval: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Cronjob', CronjobSchema);


