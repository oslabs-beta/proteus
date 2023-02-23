import  { useContext } from 'react';
import '../../Styles/createjobs.css';
import { JobTabs } from './JobTabs';
import { ThemeContext } from '../../ThemeContext';



export const JobCreator = () => {
  const theme = useContext(ThemeContext);
  return (
    <div style={{color: theme.textPrimary}} className="job_creator">
      <h1 style={{marginBottom: "1rem"}}>CREATE JOBS HERE</h1>
      <JobTabs />
    </div>

  )
}