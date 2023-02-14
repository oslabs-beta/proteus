// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  fetchingPastJobs: (jobs, time) => ipcRenderer.invoke('fetchingPastJobs', jobs, time),
  fetchCronJobs: () => ipcRenderer.invoke('fetchCronJobs'),
  submitJob: (text) => ipcRenderer.invoke('submitJob', text)
})