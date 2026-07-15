import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import style from './edit_profile.module.css'
import { useAuth } from '../../context/AuthContext';
import Axios from '../../API/Axios';
import { toast } from 'react-toastify'
import { MdErrorOutline } from "react-icons/md"

const EditProfile = () => {

  const { isAuthenticated, userDataFromJwtToken, authIsLoading } = useAuth();
  const [formData, setFormData] = useState({});
  // const [editedFormData, setEditedFormData] = useState({});
  const [isError, setIsError] = useState({});
  const [loadingForSaveChanges, setLoadingForSaveChanges] = useState(false);
  console.log('formData:', formData);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(userDataFromJwtToken);
  }, [userDataFromJwtToken]);

  if (isAuthenticated() === false) {
    return <Navigate to="/" replace />;
  }

  // form validation
  const formValidation = () => {
    const localError = {}
    // first name validation
    if (!formData.firstName.trim()) {
      localError.firstName = "Enter your name";
    }
    else if (formData.firstName.replace(/[A-Za-z0-9\s]/g, "").length > 4) {
      localError.firstName = "Too much of special characters.";
    }
    //lastName validation
    if (formData.lastName.trim()) {
      if (formData.lastName.replace(/[A-Za-z0-9\s]/g, "").length > 3) {
        localError.lastName = "Too much of special characters.";
      }
    }
    // email validation
    if (!formData.email.trim()) {
      localError.email = "Enter an email address.";
    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      localError.email = "Enter an email address like example@gmail.com.";
    }
    // contactNo validation
    if (!formData.contactNo.trim()) {
      localError.contactNo = "Enter your contact number.";
    }
    else if (!/^[0-9]{10}$/.test(formData.contactNo)) {
      localError.contactNo = "Enter a valid contact number.";
    }
    setIsError(localError)
    return Object.keys(localError).length === 0
  }

  // save changes handler
  const saveChangesHandler = async (event) => {
    event.preventDefault();
    if (formValidation()) {
      try {
        setLoadingForSaveChanges(true);
        const editedFormData = {};
        if (userDataFromJwtToken.firstName !== formData.firstName) {
          editedFormData.firstName = formData.firstName;
        };
        if (userDataFromJwtToken.lastName !== formData.lastName) {
          editedFormData.lastName = formData.lastName;
        };
        if (userDataFromJwtToken.email !== formData.email) {
          editedFormData.email = formData.email;
        };
        if (userDataFromJwtToken.contactNo !== formData.contactNo) {
          editedFormData.contactNo = formData.contactNo;
        };
        console.log('edited form',editedFormData); // console
        const tokenfromLocalStorage = localStorage.getItem('token');
        const response = await Axios.put('/api/user/me/edit',
          editedFormData,
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
        // console.error(error ? error.message : 'Something went wrong');
        const catchMessage = error.response.data.message;
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
        setLoadingForSaveChanges(false);
      }
    }
  }

  const compareObjectValues = () => {
    if (!userDataFromJwtToken || !formData) {
      return false;
    }
    const isEqual = Object.keys(userDataFromJwtToken).length === Object.keys(formData).length && Object.keys(userDataFromJwtToken).every(key => userDataFromJwtToken[key] === formData[key]);
    return isEqual ? true : false;
  }

  // cancel button function

  const cancelButtonHandler = () => {
    navigate('/profile');
  }

  return (
    <div>
      <div className={style.container}>
        <div className={style.display}>
          <div className='section_heading'>
            <h1>Edit Profile</h1>
          </div>
          {(authIsLoading || !userDataFromJwtToken) && (<div className={style.loading_container}>
            <h1>Loading...</h1>
          </div>)}
          {!authIsLoading && <div className={style.profile_details_display}>
            {/* firstName */}
            <div className={style.edit_fields}>
              <div className={style.field_name}>
                <b>First Name</b>
                <p className={style.divider_colen_mobile_responsive}>
                  <b>:</b>
                </p>
              </div>
              <div className={style.divider_colen}>
                <b>:</b>
              </div>
              <div className={style.field_value}>
                <input type="text" className={`default_input_style ${isError.firstName ? style.input_validation_error : ''}`} placeholder='First Name *' value={formData?.firstName || ''} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                {isError.firstName && <div className={style.error_message_container}>
                  <div className={style.error_icon}>
                    <MdErrorOutline />
                  </div>
                  <div className={style.error_message}>
                    <p>{isError.firstName}</p>
                  </div>
                </div>}
              </div>
            </div>
            {/* lastName */}
            <div className={style.edit_fields}>
              <div className={style.field_name}>
                <b>Last Name</b>
                <p className={style.divider_colen_mobile_responsive}>
                  <b>:</b>
                </p>
              </div>
              <div className={style.divider_colen}>
                <b>:</b>
              </div>
              <div className={style.field_value}>
                <input type="text" className={`default_input_style ${isError.lastName ? style.input_validation_error : ''}`} placeholder='Last Name' value={formData?.lastName || ''} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                {isError.lastName && <div className={style.error_message_container}>
                  <div className={style.error_icon}>
                    <MdErrorOutline />
                  </div>
                  <div className={style.error_message}>
                    <p>{isError.lastName}</p>
                  </div>
                </div>}
              </div>
            </div>
            {/* email */}
            <div className={style.edit_fields}>
              <div className={style.field_name}>
                <b>Email</b>
                <p className={style.divider_colen_mobile_responsive}>
                  <b>:</b>
                </p>
              </div>
              <div className={style.divider_colen}>
                <b>:</b>
              </div>
              <div className={style.field_value}>
                <input type="email" className={`default_input_style ${isError.email ? style.input_validation_error : ''}`} placeholder='Email *' value={formData?.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                {isError.email && <div className={style.error_message_container}>
                  <div className={style.error_icon}>
                    <MdErrorOutline />
                  </div>
                  <div className={style.error_message}>
                    <p>{isError.email}</p>
                  </div>
                </div>}
              </div>
            </div>
            {/* contactNo */}
            <div className={style.edit_fields}>
              <div className={style.field_name}>
                <b>Contact Number</b>
                <p className={style.divider_colen_mobile_responsive}>
                  <b>:</b>
                </p>
              </div>
              <div className={style.divider_colen}>
                <b>:</b>
              </div>
              <div className={style.field_value}>
                <input type="tel" className={`default_input_style ${isError.contactNo ? style.input_validation_error : ''}`} placeholder='contact No *' value={formData?.contactNo || ''} onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })} />
                {isError.contactNo && <div className={style.error_message_container}>
                  <div className={style.error_icon}>
                    <MdErrorOutline />
                  </div>
                  <div className={style.error_message}>
                    <p>{isError.contactNo}</p>
                  </div>
                </div>}
              </div>
            </div>
          </div>}
          {!authIsLoading && <div className={style.action_buttons}>
            <div className={style.cancel_button}>
              <button disabled={loadingForSaveChanges} onClick={cancelButtonHandler}>Cancel</button>
            </div>
            <div className={style.save_changes_button}>
              <button className={loadingForSaveChanges || compareObjectValues() ? style.save_changes_btn_disabled : style.save_changes_btn} disabled={loadingForSaveChanges || compareObjectValues()} onClick={saveChangesHandler}>{loadingForSaveChanges ? 'Save Changes...' : 'Save Changes'}</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default EditProfile
