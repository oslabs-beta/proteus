import { useState, useContext } from 'react';
import { JobForm } from './JobForm';
import { CronJobForm } from './CronJobForm';
import { ThemeContext } from '../../ThemeContext';

export const JobTabs = () => {
  const [ activeTab, setActiveTab ] = useState('tab1');
  const [ commandList, setCommandList ] = useState([]);
  const [ restartPolicy, setRestartPolicy ] = useState('');
  const theme = useContext(ThemeContext);


  const addCommand = (input: string): any => {
    console.log('input is ', input);
    if (!commandList.includes(input)) {
      const newCommandList: Array<string> = [...commandList];
      newCommandList.push(`"${input}"`);
      setCommandList(newCommandList);
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
      <ul className="nav-job-tabs">
        <li className={activeTab === 'tab1' ? "active" : ""} style={{fontSize: ".9rem", color: (activeTab === 'tab1' && theme.theme === 'dark') ? theme.textSecondary: theme.textPrimary}} onClick={handleTab1}><b>JOB</b></li>
        <li className={activeTab === 'tab2' ? "active" : ""} style={{fontSize: ".9rem", color: (activeTab === 'tab2' && theme.theme === 'dark') ? theme.textSecondary : theme.textPrimary}} onClick={handleTab2}><b>CRONJOB</b></li>
      </ul>
      <div className="outlet">
        {activeTab === 'tab1' ? <JobForm addCommand={addCommand} deleteCommand={deleteCommand} commandList={commandList} restartPolicy={restartPolicy} setRestartPolicy={setRestartPolicy}/> : <CronJobForm addCommand={addCommand} deleteCommand={deleteCommand} commandList={commandList} restartPolicy={restartPolicy} setRestartPolicy={setRestartPolicy}/>}
      </div>
    </div>
  )
}

