import { combineReducers } from 'redux';
//import { connectRouter } from 'connected-react-router';
import LoginReducer from './login_reducer';

const rootReducer = combineReducers({
    //router: connectRouter(history),
    loginReducer: LoginReducer,
});

export default rootReducer;