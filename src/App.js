import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Crud from './Component/Crud';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={Crud} />


      </Routes>
    </>
  );
}

export default App;
