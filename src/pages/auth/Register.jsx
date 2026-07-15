import React, { useState } from 'react'
import style from './register.module.css'
import Axios from '../../API/Axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth} from '../../context/AuthContext'

// icons
import { MdErrorOutline } from "react-icons/md"

const Register = () => {

  const [formData, setFormData] = useState(
    {
      firstName: '',
      lastName: '',
      contactNo: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  ); // to store form data
  const [isError, setIsError] = useState({}); // to store validation error
  const [isShowPassword, setIsShowPassword] = useState(false); // to toggle password visibility
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false); // to toggle password visibility
  const [isAcceptConditions, setIsAcceptConditions] = useState(false); // to store terms and conditions, privacy policy acceptance
  const [loading, setLoading] = useState(false); // to show loading state during API call
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const validationHandler = (name, value) => {
    let localError = '';
    // first name validation
    if (name === 'firstName') {
      if (!value.trim()) {
        localError = "Enter your name";
      }
      else if (value.replace(/[A-Za-z0-9\s]/g, "").length > 4) {
        localError = "Too much of special characters.";
      }
    }
    // last name validation
    if (name === 'lastName') {
      if (value.trim()) {
        if (value.replace(/[A-Za-z0-9\s]/g, "").length > 3) {
          localError = "Too much of special characters.";
        }
      }
    }
    // contact no validation
    if (name === 'contactNo') {
      if (!value.trim()) {
        localError = "Enter your contact number.";
      }
      else if (!/^[0-9]{10}$/.test(value)) {
        localError = "Enter a valid contact number.";
      }
    }
    // email validation
    if (name === 'email') {
      if (!value.trim()) {
        localError = "Enter an email address.";
      }
      else if (!/\S+@\S+\.\S+/.test(value)) {
        localError = "Enter an email address like example@gmail.com.";
      }
    }
    // password validation
    if (name === 'password') {
      if (value.length < 8) {
        localError = "Minimum 8 characters.";
      }
      else if (!/[A-Z]/.test(value)) {
        localError = "At least one uppercase letter.";
      }
      else if (!/[0-9]/.test(value)) {
        localError = "At least one number.";
      }
      else if (!value.trim()) {
        localError = "Enter a password.";
      }
    }
    // Confirm password validation
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        localError = "Confirm password is incorrect. Please try again."
      }
      else if (!value.trim()) {
        localError = "Enter a confirm password"
      }
    }
    return localError;
  }

  // for onChange event
  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validationHandler(name, value);
    setIsError((prev) => ({ ...prev, [name]: errorMessage }));
  }

  const acceptConditionHandler = () => {
    setIsAcceptConditions(prev => !prev);
    if (!isAcceptConditions) {
      setIsError((prev) => ({ ...prev, acceptCondition: "" }));
    }
  }

  // for register button click
  const submitHandler = async (event) => {
    event.preventDefault();
    const firstNameError = validationHandler('firstName', formData.firstName);
    const lastNameError = validationHandler('lastName', formData.lastName);
    const contactNoError = validationHandler('contactNo', formData.contactNo);
    const emailError = validationHandler('email', formData.email);
    const passwordError = validationHandler('password', formData.password);
    const confirmPasswordError = validationHandler('confirmPassword', formData.confirmPassword);
    if (firstNameError || lastNameError || contactNoError || emailError || passwordError || confirmPasswordError) {
      setIsError(
        {
          firstName: firstNameError,
          lastName: lastNameError,
          contactNo: contactNoError,
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError
        }
      );
      return;
    }
    if (!isAcceptConditions) {
      setIsError((prev) => ({ ...prev, acceptCondition: "You must accept the terms and conditions and privacy policy." }));
      return;
    }
    try {
      setLoading(true);
      const payLoad = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        contactNo: formData.contactNo,
        email: formData.email,
        password: formData.password
      }
      const response = await Axios.post('/api/user/register', payLoad);
      // console.log(response, 'response');
      const tryMessage = response.data.message;
      if (response.status === 201) {
        toast.success(tryMessage);
      }
      // navigate to login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 7000);
    } catch (error) {
      // console.log(error || 'API error or network error');
      const catchMessage = error.response.data.message;
      // console.log(catchMessage,'catch message');
      const catchStatusCode = error.response.status;

      if (catchStatusCode === 400) {
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

  return (
    <div>
      <div className={style.container}>
        <div className={style.display}>
          <div className="section_heading">
            <h1>REGISTER</h1>
          </div>
          <form onSubmit={submitHandler}>
            {/* first name */}
            <div className={style.first_name_input}>
              <input type="text" className={`default_input_style ${isError.firstName ? style.input_validation_error : ''}`} placeholder='First Name *' name="firstName" value={formData.firstName} onChange={changeHandler} autoFocus />
            </div>
            {isError.firstName && <div className={style.error_message_container}>
              <div className={style.error_icon}>
                <MdErrorOutline />
              </div>
              <div className={style.error_message}>
                <p>{isError.firstName}</p>
              </div>
            </div>}
            {/* last name */}
            <div className={style.last_name_input}>
              <input type="text" className={`default_input_style ${isError.lastName ? style.input_validation_error : ''}`} placeholder='Last Name (Optional)' name="lastName" value={formData.lastName} onChange={changeHandler} />
            </div>
            {isError.lastName && <div className={style.error_message_container}>
              <div className={style.error_icon}>
                <MdErrorOutline />
              </div>
              <div className={style.error_message}>
                <p>{isError.lastName}</p>
              </div>
            </div>}
            {/* contact no */}
            <div className={style.contact_no_input}>
              <input type="tel" className={`default_input_style ${isError.contactNo ? style.input_validation_error : ''}`} placeholder='Contact No *' name="contactNo" value={formData.contactNo} onChange={changeHandler} />
            </div>
            {isError.contactNo && <div className={style.error_message_container}>
              <div className={style.error_icon}>
                <MdErrorOutline />
              </div>
              <div className={style.error_message}>
                <p>{isError.contactNo}</p>
              </div>
            </div>}
            {/* email */}
            <div className={style.email_input}>
              <input type="email" className={`default_input_style ${isError.email ? style.input_validation_error : ''}`} placeholder='Email *' name="email" value={formData.email} onChange={changeHandler} />
            </div>
            {isError.email && <div className={style.error_message_container}>
              <div className={style.error_icon}>
                <MdErrorOutline />
              </div>
              <div className={style.error_message}>
                <p>{isError.email}</p>
              </div>
            </div>}
            {/* password */}
            <div className={style.password_input}>
              <input type={isShowPassword ? "text" : "password"} className={`default_input_style ${isError.password ? style.input_validation_error : ''}`} placeholder='Password *' name="password" value={formData.password} onChange={changeHandler} />
            </div>
            {/* Show password checkbox */}
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
            {/* confirm password */}
            <div className={style.confirm_password_input}>
              <input type={isShowConfirmPassword ? "text" : "password"} className={`default_input_style ${isError.confirmPassword ? style.input_validation_error : ''}`} placeholder='Confirm Password *' name="confirmPassword" value={formData.confirmPassword} onChange={changeHandler} />
            </div>
            {/* Show confirm password checkbox */}
            <div className={style.confirm_password_checkbox_label_display}>
              <div className={style.confirm_password_input_changer_checkbox}>
                <input type="checkbox" id='confirm_password_input_change' checked={isShowConfirmPassword} onChange={(e) => setIsShowConfirmPassword(e.target.checked)} />
              </div>
              <div className={style.confirm_password_input_changer_label}>
                <label htmlFor="confirm_password_input_change">Show Confirm Password</label>
              </div>
            </div>
            {isError.confirmPassword && <div className={style.error_message_container}>
              <div className={style.error_icon}>
                <MdErrorOutline />
              </div>
              <div className={style.error_message}>
                <p>{isError.confirmPassword}</p>
              </div>
            </div>}
            <br />
            {/* terms & conditions and privacy policy */}
            <div onClick={acceptConditionHandler} className={!isError.confirmPassword ? style.conditions_checkbox_label_display_margin_top : style.conditions_checkbox_label_display}>
              <input type="checkbox" checked={isAcceptConditions} onChange={(e) => setIsAcceptConditions(e.target.checked)} />
              <p>
                By Continue, you agree to the
                <a href="/terms_conditions" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  {' Terms and Conditions'}
                </a>
                {" & "}
                <a href="/privacy_policy" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  Privacy Policy
                </a>
              </p>
            </div>
            {isError.acceptCondition && <div className={style.error_message_container}>
              <div className={style.error_icon}>
                <MdErrorOutline />
              </div>
              <div className={style.error_message}>
                <p>{isError.acceptCondition}</p>
              </div>
            </div>}
            {/* register button */}
            <div className={style.register_button}>
              <button type='submit' className={loading ? style.register_btn_disabled : style.register_btn} disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
