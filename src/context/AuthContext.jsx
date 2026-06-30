import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { GoCodeOfConduct } from "react-icons/go";
import { MdOutlinePrivacyTip } from "react-icons/md";
// import { IoIosHelpCircleOutline } from "react-icons/io"; // IoIosHelpCircleOutline

import Axios from '../API/Axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const afterLoginPopupMenuOptions = [
        {
            id: 1,
            optionName: 'Profile',
            Icon: CiUser,
            path: '/profile'
        },
        {
            id: 2,
            optionName: 'Settings',
            Icon: CiSettings,
            path: '/settings'
        },
        {
            id: 3,
            optionName: 'Terms Conditions',
            Icon: GoCodeOfConduct,
            path: '/terms_conditions'
        },
        {
            id: 4,
            optionName: 'Privacy Policy',
            Icon: MdOutlinePrivacyTip,
            path: '/privacy_policy'
        }
    ];

    const [isLogin, setIsLogin] = useState(false);
    const [userDataFromJwtToken, setUserDataFromJwtToken] = useState(null);

    // send jwt token to backend and get user data if token is valid
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const tokenfromLocalStorage = localStorage.getItem('token');
                if (tokenfromLocalStorage) {
                    const response = await Axios.get('/api/user/me', {
                        headers: {
                            Authorization: `Bearer ${tokenfromLocalStorage}`
                        }
                    });
                    setUserDataFromJwtToken(response.data);
                }
            } catch (error) {
                // console.error(error ? error.message : 'An error occurred while fetching user data');
                const catchMessage = error.response.data.message;
                const catchStatusCode = error.response.status;
                if (catchStatusCode === 401) {
                    toast.warning(catchMessage);
                } else if (catchStatusCode === 403) {
                    toast.warning(catchMessage);
                } else if (catchStatusCode === 404) {
                    toast.error(catchMessage);
                } else if (catchStatusCode === 500) {
                    toast.error(catchMessage);
                } else {
                    toast.error('Something went wrong.');
                }
            }
        };
        fetchUserData();
    }, [setUserDataFromJwtToken]);

    // check if user is logged in or not
    useEffect(() => {
        if (Object.keys(userDataFromJwtToken || {}).length > 0) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [userDataFromJwtToken]);

    // login function
    const loginHandler = (token) => {
        localStorage.setItem("token", token);
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUserDataFromJwtToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                afterLoginPopupMenuOptions,
                // useSates
                isLogin,
                setIsLogin,
                userDataFromJwtToken,
                setUserDataFromJwtToken,
                // functions
                loginHandler,
                logoutHandler
            }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);