import React, {useRef} from 'react'

export const HomeListJob = ({time, name, isHovered, createdDate, interval, node, isActive, isSuspended, nextScheduledDate, setHoveredCronjob}) => {
  const ref = useRef();

  const handleHover = (status: string): void => {
    if(status === 'enter') {
      ref.current.style.backgroundColor = 'lightyellow';
      ref.current.style.border = '1px solid slategrey';
      ref.current.style.color = 'black';
    }
    else if(status === 'exit') {
      ref.current.style.backgroundColor = 'slategrey';
      ref.current.style.border = '1px solid lightyellow';
      ref.current.style.color = 'white';
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
    <div ref={ref} style={{opacity: isSuspended ? 0.7 : 1, color: isHovered ? 'black' : 'white', backgroundColor: isHovered ? 'lightyellow' : 'slategrey', border: isHovered ? '1px solid slategrey' : '1px solid lightyellow'}} onMouseEnter={() => {handleHover('enter'); setHoveredCronjob(name)}} onMouseLeave={() => {handleHover('exit'); setHoveredCronjob()}} className='home-job-list-grid home-job'>
      <div style={{height:'50px', display: 'flex', alignItems: 'center'}}>{name}</div>
      <div>{isSuspended ? 'Suspended' : nextScheduledDate.toLocaleString()}</div>
      <div>{formatTime(interval)}</div>
      <div>{createdDate.toLocaleString()}</div>
      <div>{node}</div>
      {/* <div>{getLocalTime(time)}</div> */}
    </div>
  )
}
