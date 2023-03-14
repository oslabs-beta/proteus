export type ScheduleIntervalProps = {
  startTime: number,
  jobs: object[],
  boxNumber: number,
  renderHover(): React.ReactElement
}

export type ScheduleJobProps = {
  nudge: number,
  color: string,
  name: string,
  time: Date,
  renderHover(): React.ReactElement
}

export type ScheduleJobObject = {
  name: string,
  time: Date,
  color: string,
  hovered?: boolean,
  shifted?: boolean,
  opacity?: number
}

export type HomeHoverState = {
  name?: string,
  time?: Date, 
  x?: number,
  y?: number,
  active?: boolean
}

export type ScheduleJobHoverProps = {
  name: string,
  time: Date, 
  x: number,
  y: number
}

export type HoursObject = {
  startIndex: number,
  jobs: [ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[],ScheduleJobObject[]]
}

export type ScheduleCronJob = {
  cronjob_interval: string,
  cronjob_name: string,
  cronjob_node: string,
  kube_cronjob_created: number,
  kube_cronjob_next_schedule_time: number,
  kube_cronjob_spec_failed_job_history_limit: string,
  kube_cronjob_spec_successfyl_job_history_limit: string,
  kube_cronjob_spec_suspend: boolean,
  kube_cronjob_status_active: boolean,
  kube_cronjob_status_last_schedule_time: Date,
  kube_cronjob_status_last_successful_time: Date
}

export type HomeListJobProps = {
  name: string, 
  isHovered: boolean, 
  createdDate: Date, 
  interval: string, 
  node: string, 
  isActive: boolean, 
  isSuspended: boolean, 
  nextScheduledDate: Date, 
  setHoveredCronjob: React.Dispatch<React.SetStateAction<string>>
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

export type PastJobMetrics = {
  kube_job_namespace?: string, 
  kube_job_name?: string, 
  kube_job_runtime?: string, 
  kube_job_status?: string, 
  kube_job_details?: string
}

export type ArchivedJobMetrics = {
  metrics: ArchivedMetricsObj,
  renderHover: (name: string, runtime: string | number, node: string, instance: string, cronjob_name: string, x: number, y: number) => void
}

export type ArchivedMetricsObj = {
  instance: string,
  kube_job_complete: boolean,
  kube_job_created: Date,
  kube_job_namespace: string,
  kube_job_runtime: number,
  kube_job_status_active: boolean,
  kube_job_status_completion_time: Date,
  kube_job_status_failed: boolean,
  kube_job_status_start_time: Date,
  kube_job_status_succeeded: boolean,
  kube_name: string,
  node: string,
  cronjob_name: string
}

export type ArchivedJobs = {
  kube_name?: string,
  kube_job_namespace?: string,
  kube_job_status_start_time?: string,
  completion_time?: Date,
  kube_job_status_succeeded?: string
}

export type ArchiveJobHoverProps = {
  name: string,
  runtime: number | string,
  node: string,
  instance: string,
  cronjob_name: string,
  x: number,
  y: number
}

export type DropdownProps = {
  onFilterChange: (value: string) => void
}