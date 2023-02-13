import React, { useState, useEffect } from 'react';
import '../Styles/archive.css';
import { JobForm } from './JobForm';
import { CronJobForm } from './CronJobForm';



export const JobCreator = () => {
  const [ commandList, setCommandList ] = useState([]);
  const [ restartPolicy, setRestartPolicy ] = useState('')

  const addCommand = (input): any => {
    console.log('input is ', input);
    if (!commandList.includes(input)) {
      const newCommandList: Array<string> = [...commandList];
      newCommandList.push(`"${input}"`);
      setCommandList(newCommandList);
      console.log(`submitted ${input} to command list`);
      console.log('new command list is ', newCommandList);
    } else alert(`command "${input}" already exists`)
  };

  const deleteCommand = (index: number): void => {
    console.log(`deleting ${commandList[index]} from commandList`);
    const newCommandList = [...commandList];
    newCommandList.splice(index,1);
    setCommandList(newCommandList)
  }

  return (

    <div className="job_creator_outer">
      <div className="job_creator_inner">
        <JobForm addCommand={addCommand} deleteCommand={deleteCommand} commandList={commandList} restartPolicy={restartPolicy} setRestartPolicy={setRestartPolicy}/>
        {/* <CronJobForm addCommand={addCommand} deleteCommand={deleteCommand} commandList={commandList} restartPolicy={restartPolicy} setRestartPolicy={setRestartPolicy}/> */}
      </div>
    </div>

  )
}