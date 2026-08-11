import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import style from './reset_password.module.css';
import Axios from '../../API/Axios';
import { toast } from 'react-toastify';
import { MdErrorOutline } from "react-icons/md";
import { FcExpired } from "react-icons/fc";

const ResetPassword = () => {
    const { passwordToken } = useParams();
    const navigate = useNavigate();
    const [initialLoading, setInitialLoading] = useState(false);
    const [isAccessGranted, setIsAccessGranted] = useState(false);
    const [isLinkExpired, setIsLinkExpired] = useState(false);
    const [isPageNotFound, setIsPageNotFound] = useState(false);
    const [isNewPassword, setIsNewPassword] = useState('');
    const [isConfirmNewPassword, setIsConfirmNewPassword] = useState('');
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);
    const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] = useState(false);
    const [isError, setIsError] = useState({});
    const [isSaveChangesLoading, setIsSaveChangesLoading] = useState(false);

    const saveChangesButtonIsDisabled = !isNewPassword || !isConfirmNewPassword;

    useEffect(() => {
        const verifyPasswordToken = async () => {
            try {
                setInitialLoading(true);
                const response = await Axios.post(`/api/user/me/edit/reset-password/token/${passwordToken}`);
                console.log('response', response);
                if (response.status === 200) {
                    setIsAccessGranted(true);
                }
            } catch (error) {
                const catchMessage = error.response.data.message;
                const catchStatusCode = error.response.status;
                if (catchStatusCode === 401 || catchStatusCode === 403) {
                    setIsLinkExpired(true);
                }
                else if (catchStatusCode === 404) {
                    setIsPageNotFound(true);
                }
                else if (catchStatusCode === 500) {
                    toast.error(catchMessage);
                }
                else {
                    toast.error('Something went wrong. Please try again later.');
                }
            } finally {
                setInitialLoading(false);
            }
        }
        verifyPasswordToken();
    }, [passwordToken]);

    if (initialLoading) {
        return <div className={style.initial_loading}>
            <h1>Loading...</h1>
        </div>
    }

    const formValidateHandler = () => {
        const localError = {}
        // new password
        if (!isNewPassword.trim()) {
            localError.newPassword = "Enter a password.";
        }
        else if (!/[A-Z]/.test(isNewPassword)) {
            localError.newPassword = "At least one uppercase letter.";
        }
        else if (!/[a-z]/.test(isNewPassword)) {
            localError.newPassword = "At least one lowercase letter.";
        }
        else if (!/[0-9]/.test(isNewPassword)) {
            localError.newPassword = "At least one number.";
        }
        else if (!/[!@#$%^&*(),.?":{}|<>_+=/\\[\]~`'-]/.test(isNewPassword)) {
            localError.newPassword = "At least one special charecter.";
        }
        else if (isNewPassword.length < 8) {
            localError.newPassword = "Minimum 8 characters.";
        }
        //confirm password
        if (!isConfirmNewPassword.trim()) {
            localError.confirmNewPassword = "Enter a confirm password"
        }
        else if (isNewPassword !== isConfirmNewPassword) {
            localError.confirmNewPassword = "Confirm password is incorrect. Please try again."
        }
        setIsError(localError)
        return Object.keys(localError).length === 0
    }

    const SaveChangesHandler = async (event) => {
        event.preventDefault();
        if (formValidateHandler()) {
            try {
                setIsSaveChangesLoading(true);
                const payLoad = {
                    newPassword: isNewPassword
                }
                const response = await Axios.put(`/api/user/me/edit/reset-password/${passwordToken}`, payLoad);
                console.log(response,'response');
                if (response.status === 200) {
                    toast.success(response.data.message);
                }
                navigate('/', { replace: true });
            } catch (error) {
                console.log(error)
                const catchMessage = error.response.data.message;
                const catchStatusCode = error.response.status;
                if (catchStatusCode === 400) {
                    toast.warning(catchMessage);
                }
                else if (catchStatusCode === 404) {
                    setIsPageNotFound(true);
                }
                else if (catchStatusCode === 401 || catchStatusCode === 403) {
                    setIsLinkExpired(true);
                }
                else if (catchStatusCode === 500) {
                    toast.error(catchMessage);
                }
                else {
                    toast.error('Something went wrong. Please try again later.');
                }
            } finally {
                setIsSaveChangesLoading(false);
            }
        }
    }

    return (
        <div>
            {/* actual UI */}
            {isAccessGranted && <div className={style.container}>
                <div className={style.display}>
                    <div className='section_heading'>
                        <h1>Reset Password</h1>
                    </div>
                    <form onSubmit={SaveChangesHandler}>
                        {/* new password */}
                        <div className={style.password_input}>
                            <input type={isShowNewPassword ? "text" : "password"} className={`default_input_style ${isError.newPassword ? style.input_validation_error : ''}`} placeholder='New Password *' value={isNewPassword} onChange={(e) => setIsNewPassword(e.target.value)} />
                        </div>
                        <div className={style.password_hint}>
                            <small>New password must contain at least one uppercase, one lowercase, one number, one special character and at least 8 characters</small>
                        </div>
                        <div className={style.password_checkbox_label_display}>
                            <div className={style.password_input_changer_checkbox}>
                                <input type="checkbox" id='new_password_input_change' checked={isShowNewPassword} onChange={(e) => setIsShowNewPassword(e.target.checked)} />
                            </div>
                            <div className={style.password_input_changer_label}>
                                <label htmlFor="new_password_input_change">Show New Password</label>
                            </div>
                        </div>
                        {isError.newPassword && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.newPassword}</p>
                            </div>
                        </div>}
                        {/* confirm password */}
                        <div className={style.password_input}>
                            <input type={isShowConfirmNewPassword ? "text" : "password"} className={`default_input_style ${isError.confirmNewPassword ? style.input_validation_error : ''}`} placeholder='Confirm Password *' value={isConfirmNewPassword} onChange={(e) => setIsConfirmNewPassword(e.target.value)} />
                        </div>
                        <div className={style.password_checkbox_label_display}>
                            <div className={style.password_input_changer_checkbox}>
                                <input type="checkbox" id='confirm_new_password_input_change' checked={isShowConfirmNewPassword} onChange={(e) => setIsShowConfirmNewPassword(e.target.checked)} />
                            </div>
                            <div className={style.password_input_changer_label}>
                                <label htmlFor="confirm_new_password_input_change">Show Confirm Password</label>
                            </div>
                        </div>
                        {isError.confirmNewPassword && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.confirmNewPassword}</p>
                            </div>
                        </div>}
                        <div className={style.save_changes_button}>
                            <button type='submit' className={isSaveChangesLoading || saveChangesButtonIsDisabled ? style.save_changes_btn_disabled : style.save_changes_btn} disabled={isSaveChangesLoading || saveChangesButtonIsDisabled}>{isSaveChangesLoading ? 'Save Changes...' : 'Save Changes'}</button>
                        </div>
                    </form>
                </div>
            </div>}

            {/* page not found 404 */}
            {isPageNotFound && <div className={style.page_not_found_container}>
                <div className={style.page_not_found_display}>
                    <div className={style.page_not_found_code}>
                        <h1>404</h1>
                    </div>
                    <div className={style.page_not_found_heading}>
                        <h2>Page Not Found</h2>
                    </div>
                    <div>
                        <p>Oops! It looks like the page you're trying to reach is not available</p>
                    </div>
                </div>
            </div>}

            {/* link expired */}
            {isLinkExpired && <div className={style.link_expired_container}>
                <div className={style.link_expired_display}>
                    <div className={style.expired_icon}>
                        <FcExpired />
                    </div>
                    <div>
                        <h1>Link Expired</h1>
                    </div>
                    <div>
                        <p>To reset your password, return to the login page and select "Forgot Password" to send a new email.</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ResetPassword
