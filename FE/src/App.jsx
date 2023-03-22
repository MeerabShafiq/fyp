import Router from './js/routes/Router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

const App = () => (
  <div className='App'>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </div>
);

export default App;
