import {render} from 'react-dom';
import React from 'react';
import {HashRouter,Link,Route, Routes, Switch} from "react-router-dom";
import { Home } from './Components/Home';
import { Archive } from './Components/Archive';

const App = () => {
  return (
    // <HashRouter>
    // <div className="App">
    //   <div className="menu">
    //     <Link to="/"><h2>Home</h2></Link>
    //     <Link to="/archive"><h2>Archive</h2></Link>
    //   </div>
    //     <Route path="/" element={<Home/>}/>
    //     <Route path="/archive" element={<Archive/>}/>
    // </div>
    // </HashRouter> 
    <div>
      {/* <Archive/> */}
      <Home />
    </div>
  )
}
render(<App />, document.querySelector('#root'));