import React, { useState, useEffect } from 'react';
import style from './forgot_password_mail_sended_popup.module.css';
import { CiMail } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import Axios from '../API/Axios';

const ForgotPasswordMailSendedPopup = ({ email, isPopupOpen }) => {

  useEffect(() => {
      isPopupOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
      
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isPopupOpen]);

  const [isLoading, setIsLoading] = useState(false);
  const [isMailErrorMessage, setIsMailErrorMessage] = useState('');

  const resendAction = async () => {
    try {
      setIsLoading(true);
      setIsMailErrorMessage('');
      let payLoad = {
        email: email
      }
      let response = await Axios.post('/api/user/me/edit/forgot-password', payLoad)
      console.log('response', response);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error in sending reset password email: ", error);
      const catchMessage = error.response.data.message;
      const catchStatusCode = error.response.status;
      if (catchStatusCode === 400) {
        toast.warning(catchMessage);
      }
      else if (catchStatusCode === 403) {
        setIsMailErrorMessage(catchMessage);
      }
      else if (catchStatusCode === 500) {
        toast.error(catchMessage);
      }
      else {
        toast.error('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.display}>
          <div className={style.mail_icon}>
            <div className={style.circle_for_mail_icon}>
              <CiMail />
            </div>
          </div>
          <div>
            <h1>Email sent successfully</h1>
          </div>
          <div className={style.message}>
            <p>You can close this window now. Please visit your email inbox and click the reset link received to set new password. Click the button below if no email hit your inbox.</p>
          </div>
          <div className={style.resend_button}>
            <button className={isLoading ? style.resend_btn_disabled : style.resend_btn} disabled={isLoading} onClick={resendAction}>Resend</button>
          </div>
          {isMailErrorMessage && <div className={style.mail_error_message}>
            <p><span className={style.error_icon}><MdErrorOutline /></span>{isMailErrorMessage}</p>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordMailSendedPopup
