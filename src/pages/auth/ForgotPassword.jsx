import React, { useState } from 'react';
import style from './forgot_password.module.css';
import { MdErrorOutline } from "react-icons/md";
import Axios from '../../API/Axios';
import ForgotPasswordMailSendedPopup from '../../components/ForgotPasswordMailSendedPopup';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [isEmail, setIsEmail] = useState('');
    const [isError, setIsError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isMailSended, setIsMailSended] = useState(false);
    const [isMailErrorMessage, setIsMailErrorMessage] = useState('');

    const fieldValidation = () => {
        const localError = {}
        if (!isEmail.trim()) {
            localError.email = "Enter an email address.";
        }
        if (!/\S+@\S+\.\S+/.test(isEmail)) {
            localError.email = "Enter an email address like example@gmail.com"
        }
        setIsError(localError);
        return Object.keys(localError).length === 0;
    }

    const continueAction = async (event) => {
        event.preventDefault();

        if (fieldValidation()) {
            try {
                setIsLoading(true);
                setIsMailErrorMessage('');
                let payLoad = {
                    email: isEmail
                }
                let response = await Axios.post('/api/user/me/edit/forgot-password', payLoad)
                console.log('response',response)
                if (response.status === 200) {
                    setIsMailSended(true);
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
        }
    }

    return (
        <div>
            <div className={style.container}>
                <div className={style.display}>
                    <div className='section_heading'>
                        <h1>Forget password</h1>
                    </div>
                    <form onSubmit={continueAction}>
                        <div className={style.input_field}>
                            <input type="email" className={`default_input_style ${isError.email ? style.input_validation_error : ''}`} placeholder='Enter the email *' value={isEmail} onChange={(e) => setIsEmail(e.target.value)} autoFocus />
                        </div>
                        {isError.email && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.email}</p>
                            </div>
                        </div>}
                        {isMailErrorMessage && <div className={style.mail_error_message}>
                        <p><span className={style.error_icon}><MdErrorOutline /></span>{isMailErrorMessage}</p>
                        </div>}
                        <div className={style.input_field_button}>
                            <button type='submit' className={isLoading ? style.continue_btn_disabled : style.continue_btn}>{isLoading ? 'Continue ...' : 'Continue'}</button>
                        </div>
                    </form>
                </div>
            </div>
            {isMailSended && <ForgotPasswordMailSendedPopup email={isEmail} isPopupOpen={isMailSended} />}
        </div>
    )
}

export default ForgotPassword
