import React, { useState } from 'react';
import { JobForm } from './JobForm';
import { CronJobForm } from './CronJobForm';

export const JobTabs = () => {
  const [ activeTab, setActiveTab ] = useState('tab1');
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

  const handleTab1 = () => {
    setActiveTab('tab1');
  };

  const handleTab2 = () => {
    setActiveTab('tab2');
  }


  return (
    <div className="job-tab">
      {/* TAB NAVIGATION */}
      <ul className="nav-job-tabs">
        <li className={activeTab === 'tab1' ? "active" : ""} onClick={handleTab1}>JOB</li>
        <li className={activeTab === 'tab2' ? "active" : ""} onClick={handleTab2}>CRONJOB</li>
      </ul>
      <div className="outlet">
        {activeTab === 'tab1' ? <JobForm addCommand={addCommand} deleteCommand={deleteCommand} commandList={commandList} restartPolicy={restartPolicy} setRestartPolicy={setRestartPolicy}/> : <CronJobForm addCommand={addCommand} deleteCommand={deleteCommand} commandList={commandList} restartPolicy={restartPolicy} setRestartPolicy={setRestartPolicy}/>}
      </div>
    </div>
  )
}

