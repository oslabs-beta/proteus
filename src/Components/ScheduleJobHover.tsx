import {useContext} from 'react';
import { ScheduleJobHoverProps } from '../types';
import { ThemeContext } from '../ThemeContext';

export const ScheduleJobHover = ({name, time, x, y}: ScheduleJobHoverProps) => {
  const theme = useContext(ThemeContext);
  const getLocalTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  
  return (
    <div style={{left: x, top: y, backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.borderPrimary}`}}className='home-schedule-job-hover-container'>
      <div>{name} {getLocalTime(time)}</div>
      {/* <div></div> */}
    </div>
  )
}
