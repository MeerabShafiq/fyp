import Router from './js/routes/Router';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';

const App = () => (
  <div className='App'>
    <ToastContainer/>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </div>
);

export default App;
