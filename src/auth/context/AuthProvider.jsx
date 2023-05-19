/* eslint-disable react/prop-types */
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "./AuthContext"


export const AuthProvider = ({ children }) => {

    const { authState, login, logout } = useAuth();
    
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