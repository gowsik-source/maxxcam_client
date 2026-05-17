import React, { useState } from 'react'
import style from './login.module.css'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdErrorOutline } from "react-icons/md"

const LogIn = () => {

    // const navigation = useNavigate();
    const [isEmail, setIsEmail] = useState('')
    const [isPassword, setIsPassword] = useState('')
    const [isError, setIsError] = useState({})

    const formValidation = () => {
        const localError = {}

        if (!isEmail.trim()) {
            localError.email = "Enter an email address.";
        }
        else if (!/\S+@\S+\.\S+/.test(isEmail)) {
            localError.email = "Enter an email address like example@gmail.com.";
        }
        if (!isPassword.trim()) {
            localError.password = "Enter a password.";
        }
        setIsError(localError)
        return Object.keys(localError).length === 0
    }

    const loginAction = async (event) => {
        event.preventDefault();
        if (formValidation()) {
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { isEmail, isPassword })
                console.log(response);
            } catch (error) {
                console.log('API error or network error')
            }
        }
    }
    return (
        <div>
            <div className={style.container}>
                <div className={style.display}>
                    <div className="section_heading">
                        <h1>LOGIN</h1>
                    </div>
                    <form onSubmit={loginAction}>
                        <div className={style.email_input}>
                            <input type="email" className={`default_input_style ${isError.email ? style.input_validation_error : ''}`} placeholder='Email *' value={isEmail} onChange={(e) => setIsEmail(e.target.value)} autoFocus/>
                        </div>
                        {isError.email && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.email}</p>
                            </div>
                        </div>}
                        <div className={style.password_input}>
                            <input type="password" className={`default_input_style ${isError.password ? style.input_validation_error : ''}`} placeholder='Password *' value={isPassword} onChange={(e) => setIsPassword(e.target.value)} />
                        </div>
                        {isError.password && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.password}</p>
                            </div>
                        </div>}
                        <div className={style.forgot_password}>
                            <Link to='/forgot_password'>Forgot password?</Link>
                        </div>
                        <div className={style.login_button}>
                            <button type='submit' className={style.log_in_btn}>Log In</button>
                        </div>
                    </form>
                    <div className={style.not_a_member_section}>
                        <span className={style.not_a_member_text}>Not a Member ?</span>
                        <span className={style.register_redirect_link}>
                            <Link to='/register'>Register</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn
