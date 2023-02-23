import {render} from 'react-dom';
import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Link, Route, Routes, Switch} from "react-router-dom";
import { themes, ThemeContext } from './ThemeContext';
import { Home } from './Components/Home';
import { Archive } from './Components/Archive';
import { NoPage } from './Components/NoPage';
import { JobCreator } from './Components/JobCreator';
import { Nav } from './Components/Nav';

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.style.backgroundColor = themes[theme].bgPrimary;
  }, [theme]);

  const toggleTheme = () => {
    if(theme === 'dark') setTheme('light');
    else setTheme('dark');
  }

  return (
    <HashRouter>
        {/* <Sidebar /> */}
        <ThemeContext.Provider value={{...themes[theme], toggleTheme, theme}}>
          <Nav />
          <Routes>
            <Route index element={<Home />} />
            <Route path="archive" element={<Archive />} />
            <Route path="*" element={<NoPage />} />
            <Route path="jobcreator" element={<JobCreator />} />
          </Routes>
        </ThemeContext.Provider>
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