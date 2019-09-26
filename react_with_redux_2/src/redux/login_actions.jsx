import LoginTypes from './login_types';

export const login = () => {
    return dispatch => {
        dispatch({
            type: LoginTypes.LOGIN,
            payload: 'true'
        });
    }
}

export const logOut = () => {
    return dispatch => {
        dispatch({
            type: LoginTypes.LOGOUT,
            payload: 'false'
        });
    }
}