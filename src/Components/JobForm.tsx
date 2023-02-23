import React, { useRef, useState, useEffect } from 'react';
import '../Styles/archive.css';


// const Commands = () => {
//   return (
//     <div>
//     </div>
//   )
// }


export const JobForm = (props) => {
  const { addCommand, deleteCommand, commandList, restartPolicy, setRestartPolicy } = props;
  const commandRef = useRef();
  const apiVersionRef = useRef();
  const jobNameRef = useRef();
  const imageNameRef = useRef();
  const imageURLRef = useRef();
  const backoffLimitRef = useRef();

  // handles form submission
  const handleSubmit = async (e, kind: string) => {
    e.preventDefault();
    const form = `
      apiVersion: ${apiVersionRef.current.value}
      kind: ${kind}
      metadata: 
        name: ${jobNameRef.current.value}
      spec: 
        template:
          spec:
            containers:
            - name: ${imageNameRef.current.value}
              image: ${imageURLRef.current.value}
              command: [${commandList}]
            restartPolicy: ${restartPolicy}
        backoffLimit: ${backoffLimitRef.current.value}
    `
    window.electronAPI.submitJob(form);
    alert(`submitted ${kind} form: ${form}`)
    
  };
  
  console.log('updated commandlist is ', commandList);

  // generates array of input commands and adds as a button
  const commandArray = [];
  for (let i = 0; i < commandList.length; i++) {
    commandArray.push(<button type="button" index={i} onClick={() => deleteCommand(i)}>{commandList[i]}&nbsp;&nbsp; x</button>)
  }

  return (
    <div className="job_form">
      <form id="job_form" onSubmit={(e) => handleSubmit(e, 'Job')} >
        <div>
          <label><strong>JOB NAME:&nbsp;&nbsp;&nbsp;&nbsp;</strong></label> 
          <input ref={jobNameRef} placeholder="Job Name"></input>
        </div>
        <div>
          <label><strong>API VERSION:&nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input ref={apiVersionRef} placeholder="API VERSION" type='text'></input>
        </div>
        <div>
          <label>
            <strong>CONTAINERS</strong>
            <div>
              {/* Might make this a component so we can add to array of containers */}
              <label style={{fontSize: '1.2rem'}}>Image Name:&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input ref={imageNameRef} placeholder="image name" type="text"></input><br></br>
              <label style={{fontSize: '1.2rem'}}>URL:&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input ref={imageURLRef} placeholder="ex. docker/whalesay" type="text"></input><br></br>
              <div>
                {/* Might make this a component so we can add to the array of commands */}
                <label style={{fontSize: '1.2rem'}}>Commands:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input ref={commandRef} placeholder="command" id="command_item" name="command_item" type="text"></input>
                {commandArray}
                <button type="button" className="add_command" onClick={() => addCommand(commandRef.current.value)}>Add</button>
              </div>
            </div>

          </label>
        </div>
        <div>
          <label className="restart_policy" ><strong>RESTART POLICY: &nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input type="radio" id="Never" value='Never' name='restartJob' onClick={() => setRestartPolicy('Never')}></input>&nbsp;<label style={{fontSize: '1.2rem'}} htmlFor="Never">Never</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="OnFailure" value='OnFailure' name='restartJob' onClick={() => setRestartPolicy('OnFailure')}></input>&nbsp;<label style={{fontSize: '1.2rem'}} htmlFor="OnFailure">OnFailure</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="Always" value='Always' name='restartJob' onClick={() => setRestartPolicy('Always')}></input>&nbsp;<label style={{fontSize: '1.2rem'}} htmlFor="Always">Always</label>&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div>
          <label><strong>BACKOFF LIMIT: &nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input ref={backoffLimitRef} type="number" min='0' placeholder="number"></input>
        </div>
        <input className='jobSubmitButton' type='submit' value='Submit Job'/>
      </form>
    </div>
  )
}