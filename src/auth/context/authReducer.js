

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case '[Auth] User Login':
            return {
                ...state,
                logged: true,
                user: action.payload
            };

        case '[Auth] User Logout':
            return {
                logged: false,
                user: null
            };

        default:
            return state;
    }

}