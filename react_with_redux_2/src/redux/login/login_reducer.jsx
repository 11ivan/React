import LoginTypes from './login_types';

const initialState = {
    itsLogged: 'false'
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginTypes.LOGIN:
            return {
                ...state,
                itsLogged: 'true'
            }

        case LoginTypes.LOGOUT:
            return {
                ...state,
                itsLogged: 'false'
            }
        default:
            return state;
    }
}
export default LoginReducer;