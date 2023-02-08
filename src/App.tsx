import {render} from 'react-dom';
import { Home } from './Components/Home';
import { Archive } from './Components/Archive';

const App = () => {
  return (
    <div>
      <Archive/>
    </div>
  )
}
render(<App />, document.querySelector('#root'));

// import {render} from 'react-dom';
// import {HashRouter,Link,Route,Switch} from "react-router-dom";

// import { Home } from './Components/Home';
// import { Archive } from './Components/Archive';

// const App = () => {
//   return (
//     <HashRouter>
//     <div className='App'>
//       <div className='menu'>
//         <Link to="/"><h2>Home</h2></Link>
//         <Link to="/archive"><h2>Archive</h2></Link>
//         {/* <Archive/> */}
//       </div>
//       <Switch>
//         <Route exact path="/" component={Home}/>
//         <Route exact path="/archive" component={Archive}/>
//       </Switch>
//     </div>

//     </HashRouter>
//   )
// }
// render(<App />, document.querySelector('#root'));

