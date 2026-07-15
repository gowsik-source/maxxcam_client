import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();
    const [userDataFromJwtToken, setUserDataFromJwtToken] = useState(null);
    const [authIsLoading, setAuthIsLoading] = useState(false);

    // logout function
    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUserDataFromJwtToken(null);
    };

    // send jwt token to backend and get user data if token is valid
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setAuthIsLoading(true);
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
                if (catchStatusCode === 401 && catchMessage === "Token expired, please login again") {
                    toast.warning(
                        <>
                            Session expired.
                            <br />
                            Please login again.
                        </>
                    );
                    logoutHandler(); // calling logout function
                    navigate('/login', { replace: true }); // navigate to login page
                } else if (catchStatusCode === 401) {
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
            } finally {
                setAuthIsLoading(false);
            }
        };
        fetchUserData();
    }, [setUserDataFromJwtToken, navigate]);

    // check if user is logged in or not
    const isAuthenticated = () => {
        // return Object.keys(userDataFromJwtToken || {}).length > 0 ? true : false;
        return localStorage.getItem('token') ? true : false;
    }

    // login function
    const loginHandler = (token) => {
        localStorage.setItem("token", token);
    };

    return (
        <AuthContext.Provider
            value={{
                afterLoginPopupMenuOptions,
                // useSates
                userDataFromJwtToken,
                setUserDataFromJwtToken,
                authIsLoading,
                // functions
                isAuthenticated,
                loginHandler,
                logoutHandler
            }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);