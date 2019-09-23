import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
    stateprop1: false,
    //user_text: ''
}

const Reducer1 = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SUCCESS:
            return {
                ...state,
                stateprop1: true
            }
        //break;

        case ACTION_TYPES.FAILURE:
            return {
                ...state,
                stateprop1: false
            }
        //break;
        /* case ACTION_TYPES.USER_INPUT:
            return {
                ...state,
                user_text: action.payload
            } */
        default:
            return state
        //break;
    }
}

export default Reducer1;