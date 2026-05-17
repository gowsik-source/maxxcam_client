// import logo from './logo.svg';
import React, {useEffect} from 'react';
import './App.css';
import Routing from './components/Routing'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useCart} from './context/CartContext';

function App() {
    const { isCartOpen } = useCart();
    useEffect(() => {
      if (isCartOpen) {
        document.body.classList.add('no_scroll');
      } else {
        document.body.classList.remove('no_scroll');
      }
      return () =>{
        document.body.classList.remove("no_scroll")
      }
    }, [isCartOpen]);
    return (
      <Routing/>
  );
}

export default App;
