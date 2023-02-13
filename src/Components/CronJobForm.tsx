import React, { useState, useEffect } from 'react';
import '../Styles/archive.css';


export const CronJobForm = () => {
  
  const handleSubmit = (kind: string) => {
    console.log(`submitted ${kind} form`)
  }


  



  return (
    <form onSubmit={() => handleSubmit('JOB')} >
      <header>JOB</header>
      <label>JOB NAME</label>
      <input placeholder="Job Name"></input>
      <label>API VERSION</label>
      <input placeholder="API VERSION"></input>
      <label>CONTAINERS</label>
      <div>
        <label>NAME</label>
        <input placeholder="image name" type="text"></input>
        <label>IMAGE</label>
        <input placeholder="DOCKER image URL" type="url"></input>
      </div>
      <div>
        {/* Might make this a component so we can add to the array of commands */}
        <label>COMMANDS</label>
        <input placeholder="command" type="text"></input>
      </div>
      <div>
        <label for="restart_policy" >RESTART POLICY</label>
        <select name="restart_policy">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <div>
        <label>BACKOFF LIMIT</label>
        <input type="number"></input>
      </div>
      <input className='jobSubmitButton' type='submit' value='Submit Job'/>
    </form>
  )
}