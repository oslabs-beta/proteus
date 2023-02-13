import React from 'react'

export const HomeListJob = ({time, name, isHovered, createdDate, interval, node, isActive, isSuspended, nextScheduledDate}) => {
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
    <div style={{filter: isHovered ? 'brightness(100%)' : 'brightness(100%)', color: isHovered ? 'black' : 'white', backgroundColor: isHovered ? 'lightyellow' : 'slategrey', border: isHovered ? '1px solid slategrey' : '1px solid lightyellow'}} className='home-job-list-grid home-job'>
      <div>{name}</div>
      <div>{nextScheduledDate.toLocaleString()}</div>
      <div>{formatTime(interval)}</div>
      <div>{createdDate.toLocaleString()}</div>
      <div>{node}</div>
      {/* <div>{isActive}</div>
      <div>{isSuspended}</div> */}
      {/* <div>{getLocalTime(time)}</div> */}
    </div>
  )
}
