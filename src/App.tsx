import {render} from 'react-dom';
import React from 'react';
import {HashRouter, Link, Route, Routes, Switch} from "react-router-dom";
import { Home } from './Components/Home';
import { Archive } from './Components/Archive';
import { Layout } from './Components/Layout'; 
import { NoPage } from './Components/NoPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
render(<App />, document.querySelector('#root'));