import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import style from './second_navbar.module.css'
import { VscThreeBars } from "react-icons/vsc";
import { RiCloseLargeLine } from "react-icons/ri";

const SecondNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const showMobileNavBarHandler = () => {
        setIsMobileMenuOpen(true);
        document.body.style.overflow = 'hidden';
    }

    const hideMobileNavBarHandler = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
    }

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
                <ul className={style.mobile_menu_nav}>
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>Home</NavLink></li>
                    <li><NavLink to="/shop" className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>Shop</NavLink></li>
                    <li><NavLink to="/faq" className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>Faq</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => (isActive ? style.mobile_nav_active : style.mobile_nav_inactive)} onClick={hideMobileNavBarHandler}>Contact</NavLink></li>
                </ul>
            </div>
            
        </div>
    )
}

export default SecondNavbar
