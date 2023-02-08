import React from 'react'

export const HomeListJob = ({time, name}) => {
  const getLocalTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  return (
    <div className='home-job'>
      <div>{name}</div>
      {/* <div>{getLocalTime(time)}</div> */}
    </div>
  )
}
