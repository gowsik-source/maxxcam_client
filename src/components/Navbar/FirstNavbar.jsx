import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cart from '../Cart';
import style from './first_navbar.module.css';
import Logo from '../../assets/logo.png';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
// icons
import { FaUserCircle } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const FirstNavbar = () => {
    // useContexts
    const { openCart, cartItems, isCartOpen } = useCart();
    const { afterLoginPopupMenuOptions, userDataFromJwtToken, isLogin, logoutHandler } = useAuth();
    // useStates
    const navigate = useNavigate();
    const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
    // console.log(isLoginMenuOpen, "isLoginMenuOpen");
    const loginMenuRef = useRef(null);

    useEffect(() => {
        const clickOutsideCloseLoginMenuHandler = (event) => {
            if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
                setIsLoginMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutsideCloseLoginMenuHandler);

        return () => {
            document.removeEventListener("mousedown", clickOutsideCloseLoginMenuHandler);
        };
    }, []);

    const loginButtonHandler = () => {
        if (isLogin) {
            setIsLoginMenuOpen(prev => !prev);
        } else {
            // navigate to login page
            navigate('/login');
        }
    };

    const closeLoginMenu = () => {
        setIsLoginMenuOpen(false);
    };

    return (
        <div>
            <div className={style.parent_container}>
                <div className={style.container}>
                    <div className={style.display}>
                        <div className={style.container_for_logo}>
                            <Link to={'/'} className={style.logo_display}>
                                <img src={Logo} alt="maxxcam" />
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
                            {/* login Or user menu */}
                            <div className={style.login_section} ref={loginMenuRef}>
                                {!isLogin ?
                                    <Link to={'/login'} className={style.login_link}>
                                        <span className={style.login_icon}><FaUserCircle /></span>
                                        <span className={style.login_text}>Login</span>
                                    </Link>
                                    :
                                    <button className={`default_btn ${style.login}`} onClick={loginButtonHandler}>
                                        <span className={style.login_icon}><FaUserCircle /></span>
                                        <span className={style.login_text}>{userDataFromJwtToken ? userDataFromJwtToken?.firstName : 'Login'}</span>
                                    </button>}

                                {isLoginMenuOpen && <div className={style.after_login_popup_menu_container}>
                                    {afterLoginPopupMenuOptions.map((loginMenuOption) => {
                                        const Icon = loginMenuOption.Icon;
                                        return (
                                            <div key={loginMenuOption.id}>
                                                <Link to={loginMenuOption.path} className={style.after_login_popup_menu_option} onClick={closeLoginMenu}>
                                                    <span className={style.after_login_popup_menu_option_icon}>{Icon ? <Icon /> : '*'}</span>
                                                    <span>{loginMenuOption.optionName}</span>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                    <hr />
                                    <div>
                                        <a href='/' className={style.after_login_popup_menu_option} onClick={logoutHandler}>
                                            <span className={style.after_login_popup_menu_option_icon}><FiLogOut /></span>
                                            <span>Logout</span>
                                        </a>
                                    </div>
                                </div>}
                            </div>
                            {/* cart */}
                            <div className={style.cart_section}>
                                <button className={`default_btn ${style.cart_btn}`} onClick={openCart}>
                                    <span className={style.cart_icon}><IoBagSharp /></span>
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
