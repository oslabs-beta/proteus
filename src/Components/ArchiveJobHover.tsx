import {useContext} from 'react';
import { ArchiveJobHoverProps} from '../types';
import { ThemeContext } from '../ThemeContext';

export const ArchiveJobHover = ({name, runtime, node, instance, cronjob_name, x, y}: ArchiveJobHoverProps) => {
  const theme = useContext(ThemeContext);
  const run_time = runtime !== 'NaN' ? runtime/1000 : 'Did not complete'
  return (
    <div style={{left: x, top: y, backgroundColor: theme.bgSecondary, color: theme.textPrimary, border: `1px solid ${theme.borderPrimary}`}} className='archive-job-hover-container'>
      <div><b style={{color:theme.logo}}>Name: </b><b>{name}</b></div>
      <div><b style={{color:theme.logo}}>Runtime (s): </b><b>{run_time}</b></div>
      <div><b style={{color:theme.logo}}>Cronjob: </b><b>{cronjob_name}</b></div>
      <div><b style={{color:theme.logo}}>Node: </b><b>{node}</b></div>
      <div><b style={{color:theme.logo}}>Instance: </b><b>{instance}</b></div>
    </div>
  )
}
