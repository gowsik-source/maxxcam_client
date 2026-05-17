import React, { useState, useEffect } from 'react'
import style from './footer_style.module.css'
import { Link } from 'react-router-dom';
import { FaGreaterThan } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [paymentCardImages, setPaymentCardImages] = useState([]);

  
  useEffect(() => {
    const cardImages = ["https://static.wixstatic.com/media/1f3c0f_4a4bd94be1dd4d599d59b8aa9ba936d6.png/v1/fill/w_82,h_52,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1f3c0f_4a4bd94be1dd4d599d59b8aa9ba936d6.png", "https://static.wixstatic.com/media/1f3c0f_4a36fc6977c9425c85a56116aad7c61c.png/v1/fill/w_82,h_52,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1f3c0f_4a36fc6977c9425c85a56116aad7c61c.png"];
    setPaymentCardImages(cardImages);
  }, []);

  return (
    <div>
      <div className={style.parent_container}>
        <div className={style.container}>
          <div className={style.content_display}>
            <div className={style.contact_us_display}>
              <div className={style.heading}>
                <p>Contact Us</p>
              </div>
              <div className={style.address}>
                <a href="https://maps.app.goo.gl/WGegE3qTP6mjmyFJ7" target="_blank" rel="noopener noreferrer">500 Terry Francine Street San Francisco, CA 94158</a>
              </div>
              <div className={style.contact_number}>
                <a href="tel:+911234567890">Tel: 123-456-7890</a>
              </div>
              <div className={style.mail_id}>
                <a href="mailto:info@mysite.com">info@mysite.com</a>
              </div>
            </div>
            <div className={style.customer_service_display}>
              <div className={style.heading}>
                <p>Customer Service</p>
              </div>
              <div className={style.contact_us_and_shipping_container}>
                <div className={style.contact_page_redirect}>
                  <Link to="/contact" className={style.contact_us_page_redirect_link}>
                    <span>Contact Us</span>
                    <span className={style.redirect_icon}><FaGreaterThan /></span>
                  </Link>
                </div>
                <div>
                  /
                </div>
                <div className={style.faq_page_redirect}>
                  <Link to="/faq" className={style.shipping_redirect_link}>
                    <span>Shipping</span>
                    <span className={style.shipping_redirect_icon}><FaGreaterThan /></span>
                  </Link>
                </div>
              </div>
              <div className={style.returns_and_payment_warranty_container}>
                <Link to="/faq" className={style.returns_and_payment_warranty_redirect_link}>
                  <span className={style.returns_redirect_text}>Returns</span>
                  <span className={style.returns_redirect_icon}><FaGreaterThan /></span>
                  <span className={style.slash_symbol}>/</span>
                  <span className={style.payment_warranty_redirect_link}>Payment & Warranty</span>
                  <span className={style.redirect_icon_on_payment_warranty}><FaGreaterThan /></span>
                </Link>
              </div>
            </div>
            <div className={style.payment_cards_display}>
              <div className={paymentCardImages.length <= 5 ? style.payment_cards_heading : ''}>
                <p className={style.heading}>We Accept</p>
              </div>
              <div className={paymentCardImages.length <= 5 ? style.payment_cards_display_flex : style.payment_cards_display_grid}>
                {paymentCardImages.map((image, index) => (
                  <div className={style.card} key={index}>
                    <img src={image} alt="payment card" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={style.content_display_for_social_media_copyright}>
          <div className={style.social_media_and_copyright_container}>
            <div className={style.Social_media_icons}>
              <a href="https://x.com/"><FaXTwitter /></a>
              <a href="https://www.facebook.com/"><CiFacebook /></a>
              <a href="https://www.instagram.com/"><FaInstagram /></a>
            </div>
            <div className={style.copyright}>
              <p>© 2035 MaxxCam. All rights reserved.</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
