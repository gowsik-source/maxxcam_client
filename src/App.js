// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Routing from './components/Routing'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, Bounce } from 'react-toastify';

function App() {

    return (
      <>
        <Routing/>
        <ToastContainer
            position = "top-center"
            autoClose = {5000}
            hideProgressBar = {false}
            closeOnClick = {false}
            pauseOnHover = {false}
            draggable = {true}
            progress = {undefined}
            theme = "colored"
            transition = {Bounce}
            closeButton = {false}
         />
      </>
  );
}

export default App;
