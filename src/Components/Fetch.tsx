import React, {useState} from "react";

const jobsArray = [];
const cronJobArray = [];
fetch('http://localhost:9090/api/v1/label/job_name/values', {
  method: 'GET',
  // body: JSON.stringify(),
  headers: {
      'Content-Type': 'application/json'
  }
}).then(data => data.json())
.then(response => {

  console.log(response.data)

  
  fetch(`http://localhost:9090/api/v1/query?query={job_name='whalesay'}`, {
    method: 'GET',
    // body: JSON.stringify(),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(data => data.json())
  .then(response => console.log(response));

  });