import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
    user_text: ''
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_INPUT:
            return {
                ...state,
                user_text: action.payload
            }
        //break;
        default:
            return state
        //break;
    }
}

export default UserReducer;

