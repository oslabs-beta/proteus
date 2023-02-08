import React, { useState } from 'react';
import ReactHover from 'react-hover';
import '../Styles/home.css';
import { ArchiveJob } from './ArchiveJob';
//  import whiteLogo from '../white-circle.svg';

// const optionsCursorTrueWithMargin = {
//   followCursor:true,
//   shiftX:20,
//   shiftY:0
// };

export const Archive = () => {
  const [history, setHistory] = useState(new Array(20).fill(null));
  const [isShown, setIsShown] = useState(false);

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
            <div className='archive-job-basic'>
              <ArchiveJob
                value={'testing'}
                />
            </div>
            {history.map((history: [], index: number): React.ReactElement => {
              return <div
              // trigger
                className='archive-job-basic'
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                <div><b>Name:</b></div>
                <div><b>Start Time:</b></div>
                <div><b>Completion Time:</b></div>
                <div><b>Success?</b></div>
                <div><b>Scheduled by: </b></div>
                {isShown && (
                  // hover comp
                    <div className='archive-job-all'>
                    <ArchiveJob
                    value={'TEST'}
                    />
                  </div>
                )}
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }


  // color coding => job is white, cronjob is light green
