import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DestinationPopup from '../../components/DestinationPopup';
import style from './my_cart_style.module.css';
import { useCart } from '../../context/CartContext';
import axios from 'axios';

// icons
import { FaMinus } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoPricetag } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import { FaLock } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md"

const MyCart = () => {

  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, isPromoCodeOpen, promoCodeHandler, inputRefPromo, notesHandler, isNotesOpen, inputRefNotes, totalPrice, cartIsEmpty } = useCart();
  const [isDestinationPopupOpen, setIsDestinationPopupOpen] = useState(false);
  const [cartData, setCartData] = useState({
    products: [],
    destination: {
      country: '',
      state: '',
      city: '',
      address: '',
      pinCode: ''
    },
    totalPrice: 0,
    promoCode: '',
    notes: ''
  });
  const [isError, setIsError] = useState({});
  console.log(cartData, 'cart data in my cart page');
  // console.log(isError, 'is error in my cart page');
  // console.log(totalPrice(), 'total');

  useEffect(() => {
    setCartData((prev) => {
      return {
        ...prev,
        products: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      };
    });
  }, [cartItems]);

  const openDestinationPopup = () => {
    setIsDestinationPopupOpen(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling on the main page when the image viewer is open
  }

  const closeDestinationPopup = () => {
    setIsDestinationPopupOpen(false);
    document.body.style.overflow = 'auto'; // Enable scrolling on the main page when the image viewer is open
  }

  const promoCodeApplyHandler = async () => {
    let localError = {};
    const cleanedPromoCode = cartData.promoCode.trim();
    if (!cleanedPromoCode) {
      localError.promoCode = 'Please enter a valid promo code.';
      setIsError(localError);
      return;
    }
    setIsError({});
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        promoCode: cartData.promoCode,
      });
      console.log(response, 'response from promo code apply handler');
    } catch (error) {
      setIsError({ promoCode: 'Something went wrong. Try again.' });
    }
  }

  const checkOutHandler = async () => {
    setCartData((prev) => ({ ...prev, totalPrice: totalPrice() }));
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', cartData);
      console.log(response, 'response from checkout handler');
      if (response) {
        // setIsError(prev => ({ ...prev, checkOut: 'we cannot process your order right now. Try again later' }));
        alert('We can not process your order right now. Try again later');
      }
    } catch (error) {
      console.log(error ? error.message : 'Error from checkout handler');
    }
  }

  return (
    <div>
      <div className={cartIsEmpty ? style.parent_container_hidden : style.parent_container}>
        <div className={style.container}>
          <div className={style.cart_display}>
            <div className={style.heading}>
              <h2>My Cart</h2>
            </div>
            {cartItems.map((items, index) => (
              <div className={style.cart_item_parent} key={index}>
                <hr className={style.item_line} />
                <div className={style.cart_item}>
                  <div className={style.item_image_name_price}>
                    <div className={style.product_image}>
                      <Link to={`/product/${items._id}`}>
                        <img src={items?.images[0]} alt={items?.productName} />
                      </Link>
                    </div>
                    <div className={style.item_name_and_price}>
                      <div>
                        <Link to={`/product/${items._id}`}>{items?.productName}</Link>
                      </div>
                      <div className={style.price_container}>
                        <p>₨: {items?.price}</p>
                      </div>
                      <div className={style.quantity_container_for_mobile_responsive}>
                        <button className={`default_btn ${items.quantity === 1 ? style.minus_disabled : ''}`} onClick={() => decreaseQuantity(items.id)} >
                          <FaMinus />
                        </button>
                        <div className={style.quantity_number}>
                          <p>{items.quantity}</p>
                        </div>
                        <button className={"default_btn"} onClick={() => increaseQuantity(items.id)}>
                          <IoMdAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={style.item_quantity_total_delete}>
                    <div className={style.quantity_container}>
                      <button className={`default_btn ${items.quantity === 1 ? style.minus_disabled : ''}`} onClick={() => decreaseQuantity(items.id)} >
                        <FaMinus />
                      </button>
                      <div className={style.quantity_number}>
                        <p>{items.quantity}</p>
                      </div>
                      <button className={"default_btn"} onClick={() => increaseQuantity(items.id)}>
                        <IoMdAdd />
                      </button>
                    </div>
                    <div className={style.total_price_each_item}>
                      <p>₨: {items.price * items.quantity}</p>
                    </div>
                    <button className={`default_btn ${style.delete_button}`} onClick={() => removeFromCart(items.id)}>
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <hr className={style.item_line} />
            <div className={style.promocode_and_notes_section}>
              <div className={style.promocode_container}>
                <button className={`default_btn ${style.promo_code_button}`} onClick={promoCodeHandler}>
                  <IoPricetag />
                  <span><p>Enter a promo code</p></span>
                </button>
                <div className={isPromoCodeOpen ? style.promo_code_field_container : style.promo_code_field_container_hidden}>
                  <div className={style.promo_code_field}>
                    <input type="text" placeholder='e.g:ENV123' ref={inputRefPromo} value={cartData.promoCode} onChange={(e) => setCartData((prev) => ({ ...prev, promoCode: e.target.value }))} />
                  </div>
                  <div className={style.promo_code_apply_button}>
                    <button className={cartData.promoCode.length > 0 ? style.promo_code_apply_btn : style.promo_code_default_btn} onClick={promoCodeApplyHandler}>Apply</button>
                  </div>
                </div>
                {isPromoCodeOpen && isError.promoCode && <div className={style.error_message_container}>
                  <div className={style.error_icon}>
                    <MdErrorOutline />
                  </div>
                  <div className={style.error_message}>
                    <p>{isError.promoCode}</p>
                  </div>
                </div>}
              </div>
              <div className={style.notes_container}>
                <button className={`default_btn ${style.notes_button}`} onClick={notesHandler}>
                  <GiNotebook />
                  <span><p>Add a note</p></span>
                </button>
                <div className={isNotesOpen ? style.notes_field : style.notes_field_hidden}>
                  <textarea name="" id="" placeholder='e.g: Leave outside the front door' ref={inputRefNotes} onChange={(e) => setCartData((prev) => ({ ...prev, notes: e.target.value }))}></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className={style.summery_display}>
            <div className={style.heading}>
              <h2>
                Order summary
              </h2>
            </div>
            <hr className={style.item_line} />
            <div className={style.summary_container}>
              <div>
                <p>Subtotal</p>
              </div>
              <div>
                <p>₨: {totalPrice()}</p>
              </div>
            </div>
            <div className={`${style.summary_container} ${style.delivery_container}`}>
              <div>
                <p>Delivey</p>
              </div>
              <div>
                <p>Free</p>
              </div>
            </div>
            <div className={style.destination_display}>
              <button className={`default_btn ${style.destination_button}`} onClick={openDestinationPopup}>{cartData.country && cartData.state ? `${cartData.country}, ${cartData.state}` : 'Add Address'}</button>
            </div>
            <hr className={style.item_line} />
            <div className={style.summary_container}>
              <div>
                <p>Total</p>
              </div>
              <div>
                <p>₨: {totalPrice()}</p>
              </div>
            </div>
            <div className={style.checkout_button}>
              <button onClick={checkOutHandler}>Checkout</button>
            </div>
            {isError.checkOut && <div className={style.error_message_container}>
              <div className={style.error_icon}>
                <MdErrorOutline />
              </div>
              <div className={style.error_message}>
                <p>{isError.checkOut}</p>
              </div>
            </div>}
            <div className={style.secure_checkout_text}>
              <div>
                <FaLock />
              </div>
              <div>
                <p>Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------cart is empty----------------- */}
      <div className={cartIsEmpty ? style.empty_message_container : style.empty_message_container_hidden}>
        <div className={style.empty_message_display}>
          <div>
            <h2>My cart</h2>
          </div>
          <hr className={style.item_line} />
        </div>
        <div className={style.main_cart_empty_container}>
          <div className={style.cart_is_empty}>
            <p>Cart is empty</p>
          </div>
          <div className={style.continue_browse}>
            <Link to="/">Continue Browsing</Link>
          </div>
        </div>
        <hr className={style.end_hr_line} />
      </div>
      {isDestinationPopupOpen && <DestinationPopup closePopup={closeDestinationPopup} setCartData={setCartData} />}
    </div>
  )
}

export default MyCart
