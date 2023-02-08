export type ScheduleIntervalProps = {
  startTime: number,
  jobs: object[],
  renderHover(): React.ReactElement
}

export type ScheduleJobProps = {
  nudge: number,
  color: string,
  name: string,
  time: Date,
  renderHover(): React.ReactElement
}

export type ScheduleJobHoverProps = {
  name: string,
  time: Date
}

export type JobMetrics = {
  kube_job_annotations?: string,
  kube_job_complete?: boolean,
  kube_job_created?: string,
  kube_job_info?: string,
  kube_job_labels?: string,
  kube_job_owner?: string,
  kube_job_name?: string,
  kube_job_spec_completions?: string,
  kube_job_spec_parallelism?: string,
  kube_job_status_active?: string,
  kube_job_status_completion_time?: string,
  kube_job_status_failed?: string,
  kube_job_status_start_time?: string,
  kube_job_status_succeeded?: string,
}