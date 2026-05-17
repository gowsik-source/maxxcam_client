import React from 'react'
import style from './cart_button_style.module.css'

const CartButton = (props) => {
  return (
    <div>
      <button className={style.cart_button} onClick={props.click}>{props.name}</button>
    </div>
  )
}

export default CartButton
