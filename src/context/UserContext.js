import React from "react";

import { setAuthToken } from "../services/VerifyToken";
import axios from '../services/Customize-axios'

// @function  UserContext
const UserContext = React.createContext({ name: '', auth: false });



// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({});
    const [isLogin, setIsLogin] = React.useState(false);
    const [role, setRole] = React.useState(0);
    const login = async (token) => {
        localStorage.setItem('token', token)
        if (token) {
            setAuthToken(token)
            let res = await axios.post(`/auth/check-role`)
            console.log(res);
            setIsLogin(true)
            if (res.dataUser) {
                setUser(res.dataUser)
            }
            if (res.dataRole && res.dataRole.length > 0) {
                setRole(res.dataRole.length)
                console.log('Quyền: ', res.dataRole.length);
            }
            return res.dataRole
        }

    };

    const logout = () => {
        localStorage.removeItem('token')
        setIsLogin(false)
    };

    const verifiToken = async () => {
        let token = localStorage.getItem('token')
        if (token) {
            setAuthToken(token)
            let res = await axios.post(`/auth/check-role`)
            console.log(res);
            setIsLogin(true)
            if (res.dataUser) {
                setUser(res.dataUser)
            }
            if (res.dataRole && res.dataRole.length > 0) {
                setRole(res.dataRole.length)
                console.log('Quyền: ', res.dataRole.length);
            }
            return res.dataRole
        }

    };

    return (
        <UserContext.Provider value={{ user, login, logout, verifiToken, isLogin, role }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider }