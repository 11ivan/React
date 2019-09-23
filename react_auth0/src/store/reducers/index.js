import { combineReducers } from 'redux';
import UserReducer from './user_reducer';
import Reducer1 from './reducer1';

const rootReducer = combineReducers({
    reducer1: Reducer1,
    user_reducer: UserReducer
})

export default rootReducer;
