import {useContext} from 'react';
import { ThemeContext } from '../../ThemeContext';

export const GridHeader = ({metric, invert, handleSort}: any) => {
  const theme = useContext(ThemeContext);
  return (
    <div style={{color: theme.textPrimary}} className="home-job-list-grid home-job-list-grid-header">
          <div className='grid-header-item' onClick={() => handleSort('cronjob_name')}>
            <div>Name</div>
            {metric === "cronjob_name" && invert === 1 && <div style={{borderTop: `5px solid ${theme.textPrimary}`}}className="arrow-down"></div>}
            {metric === "cronjob_name" && invert === -1 && <div style={{borderBottom: `5px solid ${theme.textPrimary}`}} className="arrow-up"></div>}
          </div>
          <div className='grid-header-item' onClick={() => handleSort('kube_cronjob_next_schedule_time')}>
            <div>Next</div>
            {metric === "kube_cronjob_next_schedule_time" && invert === 1 && <div style={{borderTop: `5px solid ${theme.textPrimary}`}}className="arrow-down"></div>}
            {metric === "kube_cronjob_next_schedule_time" && invert === -1 && <div style={{borderBottom: `5px solid ${theme.textPrimary}`}} className="arrow-up"></div>}
          </div>
          <div className='grid-header-item' onClick={() => handleSort('cronjob_interval')}>
            <div>Interval</div>
            {metric === "cronjob_interval" && invert === 1 && <div style={{borderTop: `5px solid ${theme.textPrimary}`}}className="arrow-down"></div>}
            {metric === "cronjob_interval" && invert === -1 && <div style={{borderBottom: `5px solid ${theme.textPrimary}`}} className="arrow-up"></div>}
          </div>
          <div className='grid-header-item' onClick={() => handleSort('kube_cronjob_created')}>
            <div>Created</div>
            {metric === "kube_cronjob_created" && invert === 1 && <div style={{borderTop: `5px solid ${theme.textPrimary}`}}className="arrow-down"></div>}
            {metric === "kube_cronjob_created" && invert === -1 && <div style={{borderBottom: `5px solid ${theme.textPrimary}`}} className="arrow-up"></div>}
          </div>
          <div className='grid-header-item' onClick={() => handleSort('cronjob_node')}>
            <div>Node</div>
            {metric === "cronjob_node" && invert === 1 && <div style={{borderTop: `5px solid ${theme.textPrimary}`}}className="arrow-down"></div>}
            {metric === "cronjob_node" && invert === -1 && <div style={{borderBottom: `5px solid ${theme.textPrimary}`}} className="arrow-up"></div>}
          </div>
    </div>
  )
}
