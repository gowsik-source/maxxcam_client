import React, { createContext, useContext, useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
// import { IoIosHelpCircleOutline } from "react-icons/io"; // IoIosHelpCircleOutline

import Axios from '../API/Axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const afterLoginPopupMenuOptions = [
        {
            id: 1,
            optionName: 'Profile',
            Icon: CiUser,
            path: '/faq'
        },
        {
            id: 2,
            optionName: 'Settings',
            Icon: CiSettings,
            path: '/contact'
        }
    ];

    const [isLogin, setIsLogin] = useState(false);
    const [userLoginData, setUserLoginData] = useState(null);
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
                console.error(error ? error.message : 'An error occurred while fetching user data');
            }
        };
        fetchUserData();
    }, [setUserDataFromJwtToken]);

    // check if user is logged in or not
    useEffect(() => {
        if (Object.keys(userLoginData || userDataFromJwtToken || {}).length > 0) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [userLoginData, userDataFromJwtToken]);

    // login function
    const loginHandler = (token, user) => {
        localStorage.setItem("token", token);
        setUserLoginData(user);
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUserLoginData(null);
        setUserDataFromJwtToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                afterLoginPopupMenuOptions,
                // useSates
                isLogin,
                setIsLogin,
                userLoginData,
                setUserLoginData,
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