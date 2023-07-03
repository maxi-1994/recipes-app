import { useReducer } from "react";
import { authReducer } from "../auth/context/authReducer";

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user: user,
    }
}

export const useAuth = () => {

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
        localStorage.removeItem('recipeList');
        const action = {
            type: '[Auth] User Logout',
        };

        dispatchAuthState(action);
    }

    return {
        authState,
        login,
        logout,
    }

}