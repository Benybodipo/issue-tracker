import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Callback from './pages/callback';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/callback' element={<Callback />} />
      </Routes>
    </>
  );
}

export default App;
