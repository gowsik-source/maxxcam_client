import React from 'react'
import Cart from '../Cart';
import { Link } from 'react-router-dom'
import style from './first_navbar.module.css'
import Logo from '../../assets/logo.png'
import { useCart } from '../../context/CartContext';
import { FaUserCircle } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";

const FirstNavbar = () => {

    const { openCart, cartItems, isCartOpen } = useCart();

    return (
        <div>
            <div className={style.parent_container}>
                <div className={style.container}>
                    <div className={style.display}>
                        <div className={style.container_for_logo}>
                            <Link to={'/'} className={style.logo_display}>
                                <img src={Logo} alt="max cam" />
                            </Link>
                            <span className={style.logo_text_display}>
                                <Link to={'/'} className={style.maxcam}>
                                    <span className={style.maxx}>
                                        <h1>Maxx</h1>
                                    </span>
                                    <span className={style.cam}>
                                        <h1>Cam</h1>
                                    </span>
                                </Link>
                                <Link to={'/'} className={style.perfect_picture}>
                                    <p>A Picture Perfect Camera Store</p>
                                </Link>
                            </span>
                        </div>

                    </div>
                    <div className={style.display}>
                        <div className={style.icon_container}>
                            <div className={style.login_section}>
                                <Link to={'/login'} className={style.login}>
                                    <span><FaUserCircle /></span>
                                    <span className={style.login_text}>Log In</span>
                                </Link>
                            </div>
                            <div className={style.cart_section}>
                                <button className={`default_btn ${style.cart_btn}`} onClick={openCart}>
                                    <span><IoBagSharp /></span>
                                    <span className={style.number_of_items_in_cart}>{cartItems?.length || 0}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {isCartOpen && <Cart />}
            </div>
        </div>
    )
}

export default FirstNavbar
