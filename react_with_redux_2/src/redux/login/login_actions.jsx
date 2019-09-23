import LoginTypes from './login_types';

export const login = () => {
    return dispatch => {
        dispatch({
            type: LoginTypes.LOGIN,
        });
    }
}

export const logOut = () => {
    return dispatch => {
        dispatch({
            type: LoginTypes.LOGOUT
        });
    }
}