import React, { useState } from 'react'
import style from './quick_view_style.module.css'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartButton from './CartButton'
import { FaMinus } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

const QuickView = ({ products, closeQuickView }) => {

  const [quantity, setQuantity] = useState(1);
  // to pass product to cart
  const { addToCartFromQuickViewHandler } = useCart();

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  }

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div>
      <div className={style.parent_container} onClick={(e) => e.stopPropagation()}>
        <div className={style.container}>
          <div className={style.display_left}>
            <div className={style.image_container}>
              <img src={products?.images[0]} alt={products?.productName} />
            </div>
          </div>
          <div className={style.display_right}>
            <div className={style.display_right_section}>
              <div className={style.product_name}>
                <h3>{products?.productName}</h3>
              </div>
              <div className={style.product_price}>
                <p>₨: {products?.price}</p>
              </div>
              <div className={style.quantity_text}>
                <p>Quantity*:</p>
              </div>
              <div className={style.quantity_container}>
                <div>
                  <button className={`default_btn ${quantity === 1 ? style.minus_disabled : ''}`} onClick={decreaseQuantity}>
                    <FaMinus />
                  </button>
                </div>
                <div className={style.quantity_number}>
                  <p>{quantity}</p>
                </div>
                <div>
                  <button className={"default_btn"} onClick={increaseQuantity}>
                    <IoMdAdd />
                  </button>
                </div>
              </div>
              <div className={style.add_to_cart}>
                <CartButton name='Add to Cart' click={() => addToCartFromQuickViewHandler({ ...products, quantity }, closeQuickView)} />
              </div>
              <div className={style.view_more_details}>
                <Link to={`/product/${products._id}`}>View More Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickView
