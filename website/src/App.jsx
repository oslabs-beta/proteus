import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { Home } from './components/Home.jsx';
import { Features } from './components/Features.jsx';
import { Team } from './components/Team.jsx';
import { Contact } from './components/Contact.jsx';
import { GettingStarted } from './components/GettingStarted.jsx';

function App() {


  return (
    <div>
      <div className="flex flex-col w-full">
        <div className="w-full"><Navbar /></div>
      </div>
      <Routes>
        <Route index element={<Home  />} />
        <Route path='features' element={<Features />} />
        <Route path='team' element={<Team />} />
        <Route path='contact' element={<Contact />} />
        <Route path='getstarted' element={<GettingStarted />} />
      </Routes>
    </div>
  )
}

export default App


