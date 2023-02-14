import React, { useRef, useState, useEffect } from 'react';
import '../Styles/archive.css';


export const CronJobForm = (props) => {
  const { addCommand, deleteCommand, commandList, restartPolicy, setRestartPolicy } = props;
  const [ concurrencyPolicy, setConcurrencyPolicy ] = useState('Allow');
  const [ supsension, setSuspension ] = useState(false);
  const [ imagePullPolicy, setImagePullPolicy ] = useState('Always');

  // reference hooks
  const commandRef = useRef();
  const apiVersionRef = useRef();
  const cronjobNameRef = useRef();
  const imageNameRef = useRef();
  const imageURLRef = useRef();
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
        schedule: "${scheduleMinute.current.value} ${scheduleHour.current.value} ${scheduleDay.current.value} ${scheduleMonth.current.value} ${scheduleWeekday.current.value}"
        concurrencyPolicy: ${concurrencyPolicy}
        suspend: ${supsension}
        jobTemplate:
          spec:
            template:
              spec:
                containers:
                - name: ${imageNameRef.current.value}
                  image: ${imageURLRef.current.value}
                  imagePullPolicy: ${imagePullPolicy}
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
          <label><strong>SCHEDULE:</strong></label><br></br>
              minute (0-59):&nbsp;&nbsp;&nbsp;&nbsp;<input ref={scheduleMinute} defaultValue="*" type='text' style={{width: "20px"}} ></input><br></br>
              hour (0-23):&nbsp;&nbsp;&nbsp;&nbsp;<input ref={scheduleHour} defaultValue="*" type='text' style={{width: "20px"}}></input><br></br>
              day (1-31):&nbsp;&nbsp;&nbsp;&nbsp;<input ref={scheduleDay} defaultValue="*" type='text' style={{width: "20px"}}></input><br></br>
              month (1-12):&nbsp;&nbsp;&nbsp;&nbsp;<input ref={scheduleMonth} defaultValue="*" type='text' style={{width: "20px"}}></input><br></br>
              weekday (0-6; from Sunday):&nbsp;&nbsp;&nbsp;&nbsp;<input ref={scheduleWeekday} defaultValue="*" type='text' style={{width: "20px"}}></input>       
        </fieldset>
        <fieldset>
          <label className="concurrency_policy" ><strong>CONCURRENCY POLICY: &nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input type="radio" id="Allow" value='Allow' name='concurrency' onClick={() => setConcurrencyPolicy('Allow')}></input>&nbsp;<label htmlFor="Allow">Allow</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="Forbid" value='Forbid' name='concurrency' onClick={() => setConcurrencyPolicy('Forbid')}></input>&nbsp;<label htmlFor="Forbid">Forbid</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="Replace" value='Replace' name='concurrency' onClick={() => setConcurrencyPolicy('Replace')}></input>&nbsp;<label htmlFor="Replace">Replace</label>&nbsp;&nbsp;&nbsp;&nbsp;
        </fieldset>
        <fieldset>
          <label className="supension" ><strong>SUSPEND: &nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input type="radio" id="true" value='true' name='suspend' onClick={() => setSuspension(true)}></input>&nbsp;<label htmlFor="true">true</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="false" value='false' name='suspend' onClick={() => setSuspension(false)}></input>&nbsp;<label htmlFor="false">false</label>&nbsp;&nbsp;&nbsp;&nbsp;
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
              <label className="image_pull_policy">IMAGE PULL POLICY: &nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="radio" id="Never" value='Never' name='imagePull' onClick={() => setImagePullPolicy('Never')}></input>&nbsp;<label htmlFor="Never">Never</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" id="IfNotPresent" value='IfNotPresent' name='imagePull' onClick={() => setImagePullPolicy('IfNotPresent')}></input>&nbsp;<label htmlFor="IfNotPresent">IfNotPresent</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" id="Always" value='Always' name='imagePull' onClick={() => setImagePullPolicy('Always')}></input>&nbsp;<label htmlFor="Always">Always</label>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div>
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
        <input className='jobSubmitButton' type='submit' value='Submit Job'/>
      </form>
    </div>
  )
}