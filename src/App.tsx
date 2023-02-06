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
