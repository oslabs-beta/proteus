import React, { useRef, useState, useEffect } from 'react';
import '../Styles/archive.css';


export const CronJobForm = (props) => {
  const { addCommand, deleteCommand, commandList, restartPolicy, setRestartPolicy } = props;
  const commandRef = useRef();
  const apiVersionRef = useRef();
  const cronjobNameRef = useRef();
  const imageNameRef = useRef();
  const imageURLRef = useRef();
  const backoffLimitRef = useRef();
  const scheduleMinute = useRef();
  const scheduleHour = useRef();
  const scheduleDay = useRef();
  const scheduleMonth = useRef();
  const scheduleWeekday = useRef();

  // handles form submission
  const handleSubmit = async (e, kind: string) => {
    e.preventDefault();


    const form = `
      apiVersion: ${apiVersionRef.current.value}
      kind: ${kind}
      metadata: 
        name: ${cronjobNameRef.current.value}
      spec: 
        schedule: "${scheduleMinute} ${scheduleHour} ${scheduleDay} ${scheduleMonth} ${scheduleWeekday}" --> minute(0-59) hour(0-23) day(1-31) month(1-12) weekday(0-6; Sunday to Saturday)
        jobTemplate:
          spec:
            template:
              spec:
                containers:
                - name: ${imageNameRef.current.value}
                  image: ${imageURLRef.current.value}
                  imagePullPolicy: TBEDDDDDDDDDDDD
                  command: [${commandList}]
                restartPolicy: ${restartPolicy}
    `
  
    window.electronAPI.submitJob(form);
    alert(`submitted ${kind} form: ${form}`)
    
  }


  console.log('updated commandlist is ', commandList);

  // generates array of input commands and adds as a button
  const commandArray = [];
  for (let i = 0; i < commandList.length; i++) {
    commandArray.push(<button type="button" index={i} onClick={() => deleteCommand(i)}>{commandList[i]}&nbsp;&nbsp; x</button>)
  }

  return (
    <div className="cronjob_form">
      <h1>CRONJOB</h1>
      <form onSubmit={(e) => handleSubmit(e, 'CronJob')} >
        <fieldset>
          <label><strong>CRONJOB NAME:&nbsp;&nbsp;&nbsp;&nbsp;</strong></label> 
          <input ref={cronjobNameRef} placeholder="CronJob Name"></input>
        </fieldset>
        <fieldset>
          <label><strong>API VERSION:&nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input ref={apiVersionRef} placeholder="API VERSION" type='text'></input>
        </fieldset>
        <fieldset>
          <label><strong>SCHEDULE:&nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input ref={scheduleMinute} defaultValue="*" type='text' style={{width: "15px"}}></input>
          <input ref={scheduleHour} defaultValue="*" type='text'></input>
          <input ref={scheduleDay} defaultValue="*" type='text'></input>
          <input ref={scheduleMonth} defaultValue="*" type='text'></input>
          <input ref={scheduleWeekday} defaultValue="*" type='text'></input>
        </fieldset>
        <fieldset>
          <label>
            <strong>CONTAINERS</strong>
            <div>
              <label>IMAGE NAME:&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input ref={imageNameRef} placeholder="image name" type="text"></input><br></br>
              <label>URL:&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input ref={imageURLRef} placeholder="ex. docker/whalesay" type="text"></input><br></br>
              <div>
                {/* Might make this a component so we can add to the array of commands */}
                <label>COMMANDS:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input ref={commandRef} placeholder="command" id="command_item" name="command_item" type="text"></input>
                {commandArray}
                <button type="button" className="add_command" onClick={() => addCommand(commandRef.current.value)}>Add</button>
              </div>
            </div>

          </label>
        </fieldset>
        <fieldset>
          <label className="restart_policy" ><strong>RESTART POLICY: &nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input type="radio" id="Never" value='Never' name='restartJob' onClick={() => setRestartPolicy('Never')}></input>&nbsp;<label htmlFor="Never">Never</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="OnFailure" value='OnFailure' name='restartJob' onClick={() => setRestartPolicy('OnFailure')}></input>&nbsp;<label htmlFor="OnFailure">OnFailure</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="Always" value='Always' name='restartJob' onClick={() => setRestartPolicy('Always')}></input>&nbsp;<label htmlFor="Always">Always</label>&nbsp;&nbsp;&nbsp;&nbsp;
        </fieldset>
        <fieldset>
          <label><strong>BACKOFF LIMIT: &nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input ref={backoffLimitRef} type="number" min='0' placeholder="number"></input>
        </fieldset>
        <input className='jobSubmitButton' type='submit' value='Submit Job'/>
      </form>
    </div>
  )
}