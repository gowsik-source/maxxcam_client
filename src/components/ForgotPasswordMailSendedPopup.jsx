import React from 'react';
import style from './forgot_password_mail_sended_popup.module.css';
import { CiMail } from "react-icons/ci";

const ForgotPasswordMailSendedPopup = ({successMessage, loading, resend}) => {
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
            <h1>{successMessage}</h1>
          </div>
          <div className={style.message}>
            <p>You can close this window now. Please visit your email inbox and click the reset link received to set new password. Click the button below if no email hit your inbox.</p>
          </div>
          <div className={style.resend_button}>
            <button className={loading ? style.resend_btn_disabled : style.resend_btn} disabled={loading} onClick={resend}>Resend</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordMailSendedPopup
