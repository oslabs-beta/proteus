import React, {useContext, useRef} from 'react';
import { ThemeContext } from '../ThemeContext';


export const HomeListJob = ({time, name, isHovered, createdDate, interval, node, isActive, isSuspended, nextScheduledDate, setHoveredCronjob}) => {
  const ref = useRef();
  const theme = useContext(ThemeContext);

  const handleHover = (status: string): void => {
    if(status === 'enter') {
      ref.current.style.border = `1px solid ${theme.bgListJobBorderHover}`;
      ref.current.style.filter = theme.bgListJobBrightnessHover;
    }
    else if(status === 'exit') {
      ref.current.style.border = `1px solid ${theme.borderPrimary}`;
      ref.current.style.filter = "brightness(100%)";
    }
  }
  const getLocalTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const formatTime = (minutes: number): string => {
    let result: string = ``;
    const hours = Math.floor(minutes / 60);
    minutes %= 60;
    if(minutes === 0) return `${hours} hours`;
    if(hours > 0) result += `${hours} hours `;
    result += `${minutes} minutes `;
    const seconds = minutes % Math.floor(minutes) * 60;
    if(seconds > 0) result += `${seconds} seconds`;
    return result; 
  }

  return (
    <div ref={ref} style={{filter: isHovered ? theme.bgListJobBrightnessHover : "brightness(100%)", opacity: isSuspended ? 0.7 : 1, color: theme.textPrimary, backgroundColor: `${theme.bgListJob}`, border: isHovered ? `1px solid ${theme.bgListJobBorderHover}` : `1px solid ${theme.borderPrimary}`}} onMouseEnter={() => {handleHover('enter'); setHoveredCronjob(name)}} onMouseLeave={() => {handleHover('exit'); setHoveredCronjob()}} className='home-job-list-grid home-job'>
      <div style={{height:'50px', display: 'flex', alignItems: 'center'}}>{name}</div>
      <div>{isSuspended ? 'Suspended' : nextScheduledDate.toLocaleString()}</div>
      <div>{formatTime(interval)}</div>
      <div>{createdDate.toLocaleString()}</div>
      <div>{node}</div>
      {/* <div>{getLocalTime(time)}</div> */}
    </div>
  )
}
