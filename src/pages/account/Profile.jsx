import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import style from './profile.module.css';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {

  const { isAuthenticated, userDataFromJwtToken, authIsLoading } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated() === false) {
    return <Navigate to="/" replace />;
  }

  const navigateToEditProfile = () => {
    navigate('/profile/edit');
  };

  const profileData = [
    {
      fieldName: 'First Name',
      value: userDataFromJwtToken?.firstName
    },
    {
      fieldName: 'Last Name',
      value: userDataFromJwtToken?.lastName ? userDataFromJwtToken?.lastName : ''
    },
    {
      fieldName: 'Email',
      value: userDataFromJwtToken?.email
    },
    {
      fieldName: 'Contact Number',
      value: userDataFromJwtToken?.contactNo
    }
  ];

  return (
    <div>
      <div className={style.container}>
        <div className={style.display}>
          <div className='section_heading'>
            <h1>Profile</h1>
          </div>
          {(authIsLoading || !userDataFromJwtToken) && (<div className={style.loading_container}>
            <h1>Loading...</h1>
          </div>)}
          {!authIsLoading && <div className={style.profile_details_display}>
            {profileData.map((data, index) => (
              <div key={index}>
                <div className={style.profile_field}>
                  <div className={style.field_name}>
                    <b>{data.fieldName}</b>
                    <p className={style.divider_colen_mobile_responsive}>
                      <b>:</b>
                    </p>
                  </div>
                  <div className={style.divider_colen}>
                    <b>:</b>
                  </div>
                  <div className={style.field_value}>{data.value}</div>
                </div>
                {/* hr line for mobile responsive only */}
                <hr className={index === profileData.length - 1 ? style.profile_field_divider_line_hidden : style.profile_field_divider_line} /> {/*3 === 4-1 => line hidden*/}
              </div>
            ))}
          </div>}
          {!authIsLoading && <div className={style.edit_profile_button}>
            <button onClick={navigateToEditProfile}>Edit Profile</button>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Profile
