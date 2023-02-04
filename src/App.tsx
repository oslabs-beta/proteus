import {render} from 'react-dom';
import { Home } from './Components/Home';

const App = () => {
  return (
    <div>
      <Home/>
    </div>
  )
}
render(<App />, document.querySelector('#root'));
