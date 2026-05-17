import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import HomePage from '../pages/home/HomePage'
import AlwaysScrollToTop from './AlwaysScrollToTop'
import Shop from '../pages/shop/Shop'
import Faq from '../pages/faq/Faq'
import Contact from '../pages/contact/Contact'
import Footer from './Footer'
import MyCart from '../pages/view_cart/MyCart'
import ProductDetails from '../pages/product_details/ProductDetails'
import LogIn from '../pages/auth/LogIn'
import ForgotPassword from '../pages/auth/ForgotPassword'
import Register from '../pages/auth/Register'
import ChatBot from './ChatBot'

const Routing = () => {
    return (
        <div>
            <Navbar />
            <AlwaysScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/view_cart" element={<MyCart />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/category/:category/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
            <ChatBot />
        </div>
    )
}

export default Routing
