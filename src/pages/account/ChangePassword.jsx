import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './change_password.module.css'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Axios from '../../API/Axios'
import { toast } from 'react-toastify'
import { MdErrorOutline } from "react-icons/md"

const ChangePassword = () => {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    // input fields
    const [isOldPassword, setIsOldPassword] = useState('');
    const [isNewPassword, setIsNewPassword] = useState('');
    const [isConfirmNewPassword, setIsConfirmNewPassword] = useState('');
    // checkboxes
    const [isShowOldPassword, setIsShowOldPassword] = useState(false);
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);
    const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] = useState(false);

    const [isError, setIsError] = useState({});
    const [isSaveChangesLoading, setIsSaveChangesLoading] = useState(false);

    if (isAuthenticated() === false) {
        return <Navigate to="/" replace />;
    }

    const saveChangesButtonIsDisabled = !isOldPassword || !isNewPassword || !isConfirmNewPassword;

    const formValidateHandler = () => {
        const localError = {}
        // old password
        if (!isOldPassword.trim()) {
            localError.oldPassword = "Enter your old password.";
        }
        else if (isOldPassword.length < 8) {
            localError.oldPassword = "Old password must be at least 8 characters.";
        }
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
                    oldPassword: isOldPassword,
                    newPassword: isNewPassword
                }
                const tokenfromLocalStorage = localStorage.getItem('token');
                const response = await Axios.put('/api/user/me/edit/change-password',
                    payLoad,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenfromLocalStorage}`
                        }
                    }
                );
                const tryMessage = response.data.message;
                if (response.status === 200) {
                    toast.success(tryMessage);
                }
                navigate('/profile');
            } catch (error) {
                const catchMessage = error.response.data.message;
                const catchStatusCode = error.response.status;
                if (catchStatusCode === 400) {
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
                setIsSaveChangesLoading(false);
            }
        }
    }

    const cancelButtonHandler = () => {
        navigate('/profile');
    }

    return (
        <div>
            <div className={style.container}>
                <div className={style.display}>
                    <div className='section_heading'>
                        <h1>Change Password</h1>
                    </div>
                    <form onSubmit={SaveChangesHandler}>
                        {/* old password */}
                        <div className={style.password_input}>
                            <input type={isShowOldPassword ? "text" : "password"} className={`default_input_style ${isError.oldPassword ? style.input_validation_error : ''}`} placeholder='Old Password *' value={isOldPassword} onChange={(e) => setIsOldPassword(e.target.value)} />
                        </div>
                        <div className={style.password_checkbox_label_display}>
                            <div className={style.password_input_changer_checkbox}>
                                <input type="checkbox" id='old_password_input_change' checked={isShowOldPassword} onChange={(e) => setIsShowOldPassword(e.target.checked)} />
                            </div>
                            <div className={style.password_input_changer_label}>
                                <label htmlFor="old_password_input_change">Show Old Password</label>
                            </div>
                        </div>
                        {isError.oldPassword && <div className={style.error_message_container}>
                            <div className={style.error_icon}>
                                <MdErrorOutline />
                            </div>
                            <div className={style.error_message}>
                                <p>{isError.oldPassword}</p>
                            </div>
                        </div>}
                        <div className={style.forgot_password}>
                            <Link to='/forgot_password'>Forgot password?</Link>
                        </div>
                        {/* new password */}
                        <div className={style.password_input}>
                            <input type={isShowNewPassword ? "text" : "password"} className={`default_input_style ${isError.newPassword ? style.input_validation_error : ''}`} placeholder='New Password *' value={isNewPassword} onChange={(e) => setIsNewPassword(e.target.value)} />
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
                        {/* confirm new password */}
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
                        <div className={style.action_buttons}>
                            <div className={style.cancel_button}>
                                <button disabled={isSaveChangesLoading} onClick={cancelButtonHandler}>Cancel</button>
                            </div>
                            <div className={style.save_changes_button}>
                                <button type='submit' className={isSaveChangesLoading || saveChangesButtonIsDisabled ? style.save_changes_btn_disabled : style.save_changes_btn} disabled={isSaveChangesLoading || saveChangesButtonIsDisabled}>{isSaveChangesLoading ? 'Save Changes...' : 'Save Changes'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
