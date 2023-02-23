import {render} from 'react-dom';
import { useState, useEffect } from 'react';
import { HashRouter, Route, Routes} from "react-router-dom";
import { themes, ThemeContext } from './ThemeContext';
import { Home } from './Components/Home/Home';
import { Archive } from './Components/Archive/Archive';
import { NoPage } from './Components/NoPage';
import { JobCreator } from './Components/JobCreator/JobCreator';
import { Nav } from './Components/Nav';

const App = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.style.backgroundColor = themes[theme].bgPrimary;
  }, [theme]);

  const toggleTheme = () => {
    if(theme === 'dark') setTheme('light');
    else setTheme('dark');
  }

  return (
    <HashRouter>
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