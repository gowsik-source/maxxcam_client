import React, { useState } from 'react'
import style from './forgot_password.module.css'
import { MdErrorOutline } from "react-icons/md"
import axios from 'axios'

const ForgotPassword = () => {

    const [isEmail, setIsEmail] = useState('')
    const [isError, setIsError] = useState({})

    const fieldValidation = () => {
        const localError = {}
        if (!isEmail.trim()) {
            localError.email = "Enter an email address.";
        }
        if (!/\S+@\S+\.\S+/.test(isEmail)) {
            localError.email = "Enter an email address like example@gmail.com"
        }
        setIsError(localError)
        return Object.keys(localError).length === 0
    }

    const continueAction = async (event) => {
        event.preventDefault();

        if (fieldValidation()) {
            try {
                let response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', { isEmail })
                console.log(response);
            } catch (error) {
                console.log("Error in sending reset password email: ", error);
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
                            <input type="email" className={`default_input_style ${isError.email ? style.input_validation_error : ''}`} placeholder='Enter the email *' value={isEmail} onChange={(e) => setIsEmail(e.target.value)} autoFocus/>
                        </div>
                        {isError.email && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.email}</p>
                            </div>
                        </div>}
                        <div className={style.input_field_button}>
                            <button type='submit' className={style.continue_btn}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
