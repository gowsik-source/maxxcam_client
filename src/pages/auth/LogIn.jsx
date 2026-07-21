import React, { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import style from './login.module.css'
import Axios from '../../API/Axios'
import { MdErrorOutline } from "react-icons/md"
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

const LogIn = () => {

    const [isEmail, setIsEmail] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isError, setIsError] = useState({});
    const [loading, setLoading] = useState(false);
    const { loginHandler, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

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
        else if (isPassword.length < 8) {
            localError.password = "Password must be at least 8 characters.";
        }
        setIsError(localError)
        return Object.keys(localError).length === 0
    }

    const loginAction = async (event) => {
        event.preventDefault();
        if (formValidation()) {
            try {
                setLoading(true);
                const payLoad = {
                    email: isEmail,
                    password: isPassword
                }
                const response = await Axios.post('/api/user/login', payLoad);
                console.log(response);
                const tryMessage = response.data.message;
                const jwtToken = response.data.token;
                if (response.status === 200) {
                    toast.success(tryMessage);
                    loginHandler(jwtToken); // call the login function from useAuth to Store the JWT token in localStorage & set the user data in the context
                }
                navigate('/');
            } catch (error) {
                // console.log(error ? error.message : 'Something went wrong');
                const catchMessage = error.response.data.message;
                const catchStatusCode = error.response.status;

                if (catchStatusCode === 404) {
                    toast.error(catchMessage);
                }
                else if (catchStatusCode === 400) {
                    toast.warning(catchMessage);
                }
                else if (catchStatusCode === 401) {
                    toast.warning(catchMessage);
                }
                else if (catchStatusCode === 500) {
                    toast.error(catchMessage);
                }
                else {
                    toast.error('Something went wrong. Please try again later.');
                }
            } finally {
                setLoading(false);
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
                            <input type="email" className={`default_input_style ${isError.email ? style.input_validation_error : ''}`} placeholder='Email *' value={isEmail} onChange={(e) => setIsEmail(e.target.value)} autoFocus />
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
                            <input type={isShowPassword ? "text" :"password"} className={`default_input_style ${isError.password ? style.input_validation_error : ''}`} placeholder='Password *' value={isPassword} onChange={(e) => setIsPassword(e.target.value)} />
                        </div>
                        <div className={style.password_checkbox_label_display}>
                            <div className={style.password_input_changer_checkbox}>
                                <input type="checkbox" id='password_input_change' checked={isShowPassword} onChange={(e) => setIsShowPassword(e.target.checked)} />
                            </div>
                            <div className={style.password_input_changer_label}>
                                <label htmlFor="password_input_change">Show Password</label>
                            </div>
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
                            <button type='submit' className={loading ? style.log_in_btn_disbled : style.log_in_btn} disabled={loading}>{loading ? 'Logging...' : 'Log In'}</button>
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
