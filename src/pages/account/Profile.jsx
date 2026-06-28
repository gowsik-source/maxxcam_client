import React from 'react'
import style from './profile.module.css';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {

  const { userDataFromJwtToken } = useAuth();

  return (
    <div>
      <div className={style.container}>
        <div className={style.display}>
          <div className='section_heading'>
            <h1>Profile</h1>
          </div>
          <div style={{display: 'flex'}}>
            <div>first name</div>
            <div>:</div>
            {/* <div>{userDataFromJwtToken.firstName}</div> */}
          </div>
          <button onClick={()=> window.location.href='/'}>click</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
