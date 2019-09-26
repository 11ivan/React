import LoginTypes from './login_types';

const initialState = {
    itsLogged: 'false'
}

const LoginReducer = (state = initialState, action) => {
    //console.log('ACTION: ', action);
    switch (action.type) {
        case LoginTypes.LOGIN:
            console.log('LOGIN');

            return {
                ...state,
                itsLogged: 'true'
            }

        case LoginTypes.LOGOUT:
            console.log('LOGOUT');
            return {
                ...state,
                itsLogged: 'false'
            }
        default:
            return state;
    }
}
export default LoginReducer;