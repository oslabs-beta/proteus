import React from 'react';
import '../Styles/home.css';
//  import whiteLogo from '../Components/white-circle.png';

export const Archive = () => {
    const history = [];
    for (let i = 0; i < 10; i++) {
        history.push(
            <div className="home-job">
                <div><b>Name:</b></div>
                <div><b>Data1</b></div>
                <div><b>Data3</b></div>
                <div><b>Data4</b></div>
                <div><b>Data5</b></div>
                <div><b>Data6</b></div>
            </div>

            // <div
            // key ={i}
            // name={this.state.name[i]}
            // data={this.state.data[i]}
            // />
        )
    }
    return (
      <div className='home-container'>
        <div className="home-title">
          <div><b>cluster:</b> eks-cluster-01</div>
          <div><b>namespace:</b> default</div>
          <div><b>Job:</b> white circle</div>
          <div><b>Cronjob:</b> light green circle</div>
        </div>
        <div className="archive-job-list">
            {history}
          {/* <div className="home-job"></div>
          <div className="home-job"></div>
          <div className="home-job"></div> */}
        </div>
      </div>
    )
  }


  // color coding => job is white, cronjob is light green
  // 
// FETCH REQUESTS 
//   fetch('http://localhost:9090/api/v1/label/job_name/values', {
//   method: 'GET',
//   // body: JSON.stringify(),
//   headers: {
//       'Content-Type': 'application/json'
//   }
// }).then(data => data.json())
// .then(response => console.log(response));

// //Fetch job metrics
// fetch(`http://localhost:9090/api/v1/query?query={cronjob='cronjob-test'}`, {
//   method: 'GET',
//   // body: JSON.stringify(),
//   headers: {
//       'Content-Type': 'application/json'
//   }
// }).then(data => data.json())
// .then(response => console.log(response));