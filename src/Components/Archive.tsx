import React, { useState } from 'react';
import ReactHover from 'react-hover';
import '../Styles/home.css';
import { ArchiveJob } from './ArchiveJob';
import { ArchiveJobHover } from './ArchiveJobHover';
//  import whiteLogo from '../white-circle.svg';

// const optionsCursorTrueWithMargin = {
//   followCursor:true,
//   shiftX:20,
//   shiftY:0
// };

export const Archive = () => {
  // const [history, setHistory] = useState(new Array(20).fill(null));
  const [history, setHistory] = useState([
    {
      name: 'First',
      start_time: 12,
      completion_time: 2,
      success: 'Yes',
      schedulbed_by: 'Me'
    },
    {
      name: 'Second',
      start_time: 10,
      completion_time: 3,
      success: 'No',
      schedulbed_by: 'Someone Else'
    },
  ]);
  const [hover, setHover] = useState({});
  const archiveArray: React.ReactElement[] = [];

  const renderHover = (name, success): void => {
    if(!name) setHover({...hover, active:false});
    else setHover({name, success, active: true});
  }

  for (let i = 0; i < history.length; i++) {
    archiveArray.push(
      <ArchiveJob value={history[i]} renderHover={renderHover}  />
    )
  }

    return (
      <div className='archive-container'>
        <div className="archive-title">
          <div><b>cluster:</b> eks-cluster-01</div>
          <div><b>Job:</b> white circle</div>
          <div><b>Cronjob:</b> light green circle</div>
        </div>
        <div className='archive-data'>
          <div className="data-types">
            <div><b>Name:</b></div>
            <div><b>Start Time:</b></div>
            <div><b>Completion Time:</b></div>
            <div><b>Success?</b></div>
            <div><b>Scheduled by: </b></div>
          </div>
          <div className="archive-job-list">
            {/* parent  */}
            {/* <div className='archive-job-basic'>
              <ArchiveJob
                value={'testing'}
                />
            </div> */}
           {archiveArray}
            {/* {hover.active && <ArchiveJobHover name={hover.name} success={hover.success}/>} */}
          </div>
        </div>
        {hover.active && <ArchiveJobHover name={hover.name} success={hover.success}/>}
      </div>
    )
  }


  // color coding => job is white, cronjob is light green
