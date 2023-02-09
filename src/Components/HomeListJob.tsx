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
  return (
    <div style={{filter: isHovered ? 'brightness(120%)' : 'brightness(100%)'}}className='home-job'>
      <div>{name}</div>
      <div>Created at {createdDate.toLocaleString()}</div>
      <div>Interval: {interval}</div>
      <div>{node}</div>
      <div>{isActive}</div>
      <div>{isSuspended}</div>
      <div>Next run: {nextScheduledDate.toLocaleString()}</div>
      {/* <div>{getLocalTime(time)}</div> */}
    </div>
  )
}
