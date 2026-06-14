// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Routing from './components/Routing'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';

function App() {

    return (
      <>
        <Routing/>
        <ToastContainer />
      </>
  );
}

export default App;
