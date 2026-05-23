import React from 'react'
import style from './cart_style.module.css'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

// icons
import { RiCloseLargeLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoPricetag } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const Cart = () => {
    const { closeCart, cartItems = [], isCartOpen, removeFromCart, increaseQuantity, decreaseQuantity, isPromoCodeOpen, promoCodeHandler, inputRefPromo, totalPrice, goToMyCart, cartIsEmpty, isPromoCodeValue, setIsPromoCodeValue, isPromoCodeError, promoCodeApplyHandler } = useCart();
    // console.log(cartItems, 'cart items');
    if (!isCartOpen) return null;

    return (
        <div>
            <div className={style.overlay} onClick={closeCart}></div>
            <div className={style.container}>
                {/* -------------header-------------- */}
                <div className={style.header_parent}>
                    <div className={style.header}>
                        <div className={style.header_display_left}>
                            <p>Cart</p>
                            <span>({cartItems?.length || 0} items)</span>
                        </div>
                        <div className={style.header_display_right}>
                            <button className='default_btn' onClick={closeCart}>
                                <RiCloseLargeLine />
                            </button>
                        </div>
                    </div>
                </div>
                {/* --------------------body----------------- */}
                <div>
                    <div className={style.cart_items_container}>
                        {cartItems.map((item, index) => (
                            <div className={style.cart_item_parent} key={index}>
                                <div className={style.cart_item}>
                                    <div className={style.product_image}>
                                        <Link to={`/product/${item._id}`} onClick={closeCart}>
                                            <img src={item?.images[0]} alt={item?.productName} />
                                        </Link>
                                    </div>
                                    <div className={style.item_details}>
                                        <div className={style.product_name}>
                                            <Link to={`/product/${item._id}`} onClick={closeCart}>{item?.productName}</Link>
                                        </div>
                                        <div className={style.price_container}>
                                            <p>₨: {item?.price}</p>
                                        </div>
                                        <div className={style.quantity_container}>
                                            <div>
                                                <button className={`default_btn ${item.quantity === 1 ? style.minus_disabled : ''}`} onClick={() => decreaseQuantity(item._id)} >
                                                    <FaMinus />
                                                </button>
                                            </div>
                                            <div className={style.quantity_number}>
                                                <p>{item.quantity}</p>
                                            </div>
                                            <div>
                                                <button className={"default_btn"} onClick={() => increaseQuantity(item._id)}>
                                                    <IoMdAdd />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.delete_icon_container}>
                                        <div>
                                            <button className='default_btn' onClick={() => removeFromCart(item._id)}>
                                                <RiDeleteBinLine />
                                            </button>
                                        </div>
                                        <div>
                                            <p>₨: {item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className={index !== cartItems.length - 1 ? style.hr_for_each_product : ''} />
                            </div>
                        ))}
                        <div className={style.promo_code_container_parent}>
                            <div className={cartIsEmpty ? style.promo_code_container_hidden : style.promo_code_container}>
                                <hr />
                                <div>
                                    <button className={`default_btn ${style.promo_code_button}`} onClick={promoCodeHandler}>
                                        <IoPricetag />
                                        <span><p>Enter a promo code</p></span>
                                    </button>
                                </div>
                                <div className={isPromoCodeOpen ? style.promo_code_field_container : style.promo_code_field_container_hidden}>
                                    <div className={style.promo_code_field}>
                                        <input type="text" placeholder='e.g:ENV123' ref={inputRefPromo} value={isPromoCodeValue} onChange={(e) => setIsPromoCodeValue(e.target.value)} />
                                    </div>
                                    <div className={style.promo_code_apply_button}>
                                        <button className={isPromoCodeValue.length > 0 ? style.promo_code_apply_btn : style.promo_code_default_btn} onClick={promoCodeApplyHandler}>Apply</button>
                                    </div>
                                </div>
                                {isPromoCodeOpen && isPromoCodeError.promoCode && <div className={style.error_message_container}>
                                    <div className={style.error_icon}>
                                        <MdErrorOutline />
                                    </div>
                                    <div className={style.error_message}>
                                        <p>{isPromoCodeError.promoCode}</p>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    {/* ----------------footer---------------- */}
                    <div className={style.cart_footer_parent}>
                        <div className={cartIsEmpty ? style.cart_footer_container_hidden : style.cart_footer_container}>
                            <hr />
                            <div className={style.estimated_total_container}>
                                <div>
                                    <h4>Estimated total</h4>
                                </div>
                                <div>
                                    <p>₨: {totalPrice()}</p>
                                </div>
                            </div>
                            <div>
                                <button className={style.checkout_button} onClick={() => alert('We are currently not accepting orders at the moment')}>Checkout</button>
                            </div>
                            <div>
                                <button className={style.viewcart_button} onClick={goToMyCart}>View Cart</button>
                            </div>
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
                <div className={cartIsEmpty ? style.show_empty_message : style.hide_empty_message}>
                    <p>Your cart is empty.</p>
                </div>
            </div>
        </div>
    )
}

export default Cart