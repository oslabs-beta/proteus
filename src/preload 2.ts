// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  fetchCronJobs: () => ipcRenderer.invoke('fetchCronJobs'),
  submitJob: (text: string) => ipcRenderer.invoke('submitJob', text),
  fetchAllJobs: () => ipcRenderer.invoke('fetchAllJobs'),
})