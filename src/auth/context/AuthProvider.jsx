/* eslint-disable react/prop-types */
import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer";


const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user: user,
    }
}

export const AuthProvider = ({ children }) => {

    const [ authState, dispatchAuthState ] = useReducer(authReducer, {}, init);

    const login = (userState) => {
        const action = {
            type: '[Auth] User Login',
            payload: userState
        }; 

        localStorage.setItem('user', JSON.stringify(userState));
        dispatchAuthState(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        const action = {
            type: '[Auth] User Logout',
        };

        dispatchAuthState(action);
    }
    
    return (
        <AuthContext.Provider value={{
            authState,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}