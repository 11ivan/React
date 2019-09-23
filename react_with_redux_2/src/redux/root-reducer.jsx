import { combineReducers } from 'redux';
//import { connectRouter } from 'connected-react-router';
import LoginReducer from './login/login_reducer';

const rootReducer = (/*history*/) => combineReducers({
    //router: connectRouter(history),
    loginReducer: LoginReducer,
});

export default rootReducer;