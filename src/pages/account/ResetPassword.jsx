import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import style from './reset_password.module.css';
import { MdErrorOutline } from "react-icons/md"

const ResetPassword = () => {
    const [isNewPassword, setIsNewPassword] = useState('');
    const [isConfirmNewPassword, setIsConfirmNewPassword] = useState('');
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);
    const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] = useState(false);
    const [isError, setIsError] = useState({});
    const [isSaveChangesLoading, setIsSaveChangesLoading] = useState(false);
    // const navigate = useNavigate();

    const saveChangesButtonIsDisabled = !isNewPassword || !isConfirmNewPassword;

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
                console.log('submitted');
            } catch (error) {
                console.log(error)
            } finally {
                setIsSaveChangesLoading(false);
            }
        }
    }

    return (
        <div>
            <div className={style.container}>
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
                        <div className={style.save_changes_button}>
                            <button type='submit' className={isSaveChangesLoading || saveChangesButtonIsDisabled ? style.save_changes_btn_disabled : style.save_changes_btn} disabled={isSaveChangesLoading || saveChangesButtonIsDisabled}>{isSaveChangesLoading ? 'Save Changes...' : 'Save Changes'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
