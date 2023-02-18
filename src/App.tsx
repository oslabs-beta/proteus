import {render} from 'react-dom';
import React, { useState } from 'react';
import { HashRouter, Link, Route, Routes, Switch} from "react-router-dom";
import { Home } from './Components/Home';
import { Archive } from './Components/Archive';
import { Layout } from './Components/Layout'; 
import { NoPage } from './Components/NoPage';
import { JobCreator } from './Components/JobCreator';
import { Sidebar } from './Components/Sidebar';

const App = () => {
  
  return (
    <HashRouter>
      <Sidebar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="archive" element={<Archive />} />
        <Route path="*" element={<NoPage />} />
        <Route path="jobcreator" element={<JobCreator />} />
      </Routes>
    </HashRouter>
  )
}
render(<App id="app"/>, document.querySelector('#root'));


// const App = () => {
  
//   return (
//     <HashRouter>
//       <Sidebar />
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="archive" element={<Archive />} />
//           <Route path="*" element={<NoPage />} />
//           <Route path="jobcreator" element={<JobCreator />} />
//         </Route>
//       </Routes>
//     </HashRouter>
//   )
// }
// render(<App />, document.querySelector('#root'));