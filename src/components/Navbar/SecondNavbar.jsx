import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from './second_navbar.module.css';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { VscThreeBars } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

const SecondNavbar = () => {

    const { afterLoginPopupMenuOptions, isLogin, userDataFromJwtToken, logoutHandler } = useAuth();

    // const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const showMobileNavBarHandler = () => {
        setIsMobileMenuOpen(true);
        document.body.style.overflow = 'hidden';
    }

    const hideMobileNavBarHandler = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
    }

    // const loginButtonHandler = () => {
    //     if (!isLogin) {
    //         navigate('/login')
    //     }
    // };

    return (
        <div>
            <div className={style.parent_container}>
                <div className={style.container}>
                    <div className={style.display}>
                        <div className={style.menu}>
                            <ul>
                                <li><NavLink to="/" className={({ isActive }) => (isActive ? style.active : style.in_active)}>Home</NavLink></li>
                                <li><NavLink to="/shop" className={({ isActive }) => (isActive ? style.active : style.in_active)}>Shop</NavLink></li>
                                <li><NavLink to="/faq" className={({ isActive }) => (isActive ? style.active : style.in_active)}>Faq</NavLink></li>
                                <li><NavLink to="/contact" className={({ isActive }) => (isActive ? style.active : style.in_active)}>Contact</NavLink></li>
                            </ul>
                        </div>
                        <div className={style.nav_icon_for_mobile}>
                            <button className={`default_btn ${style.handburger_icon_for_mobile}`} onClick={showMobileNavBarHandler}><VscThreeBars /></button>
                        </div>
                        <div className={style.call}>
                            <a href="tel:1-800-123-4567">Call Us: 1-800-123-4567</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* navbar for mobile */}
            {isMobileMenuOpen && <div className={style.mobile_menu_nav_overlay} onClick={(e) => { e.stopPropagation(); hideMobileNavBarHandler(); }}></div>}
            <div className={isMobileMenuOpen ? style.mobile_menu_nav_container_open : style.mobile_menu_nav_container_closed} onClick={(e) => e.stopPropagation()}>
                <div className={isMobileMenuOpen ? style.mobile_menu_nav_close_visible : style.mobile_menu_nav_close_hidden}>
                    <button className='default_btn' onClick={hideMobileNavBarHandler}><RiCloseLargeLine /></button>
                </div>
                <div className={style.mobile_menu_nav}>
                    <div className={style.mobile_nav_header}>
                        {/* mobile nav login */}
                        <div className={style.mobile_nav_login_section}>
                            {/* {!isLogin ? */}
                                <Link to={isLogin ? '/profile' : '/login'} className={style.login_link} onClick={hideMobileNavBarHandler}>
                                    <span className={style.login_icon}><FaUserCircle /></span>
                                    <span className={style.login_text}>{isLogin ? userDataFromJwtToken?.firstName : 'Login'}</span>
                                </Link>
                                 {/* :
                                 <button className={`default_btn ${style.login}`} onClick={loginButtonHandler}>
                                     <span className={style.login_icon}><FaUserCircle /></span>
                                     <span className={style.login_text}>{userDataFromJwtToken ? userDataFromJwtToken?.firstName : 'Login'}</span>
                                 </button>
                             } */}
                        </div>
                        {/* mobile nav logo */}
                        <div className={style.container_for_logo_mobile_nav}>
                            <Link to={'/'} className={style.logo_display} onClick={hideMobileNavBarHandler}>
                                <img src={Logo} alt="maxxcam" />
                            </Link>
                            <span className={style.logo_text_display}>
                                <Link to={'/'} className={style.maxcam} onClick={hideMobileNavBarHandler}>
                                    <span className={style.maxx}>
                                        <h1>Maxx</h1>
                                    </span>
                                    <span className={style.cam}>
                                        <h1>Cam</h1>
                                    </span>
                                </Link>
                                <Link to={'/'} className={style.perfect_picture} onClick={hideMobileNavBarHandler}>
                                    <p>A Picture Perfect Camera Store</p>
                                </Link>
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className={style.mobile_nav_body}>
                        <ul>
                            <li><NavLink to="/" className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>Home</NavLink></li>
                            <li><NavLink to="/shop" className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>Shop</NavLink></li>
                            <li><NavLink to="/faq" className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>Faq</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>Contact</NavLink></li>
                            <hr />
                            <div className={style.after_login_popup_menu_container}>
                                {afterLoginPopupMenuOptions.map((loginMenuOption) => {
                                    const Icon = loginMenuOption.Icon;
                                    return (
                                        <div key={loginMenuOption.id}>
                                            <li><NavLink to={loginMenuOption.path} className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>
                                                <span className={style.after_login_popup_menu_option_icon}>{Icon ? <Icon /> : '*'}</span>
                                                <span>{loginMenuOption.optionName}</span>
                                            </NavLink></li>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr />
                            <div>
                                <li><a href='/' className={style.logout_link} onClick={logoutHandler}>
                                    <span className={style.logout_icon}><FiLogOut /></span>
                                    <span>Logout</span>
                                </a></li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SecondNavbar
