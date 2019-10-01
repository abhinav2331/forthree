import { GET_ALL_ATTRIBUTES } from '../actions/action.type';

const attributesReducer = (state = { Attributes: [] }, action) => {
    //debugger;
    switch (action.type) {
        case GET_ALL_ATTRIBUTES:
            return {
                ...state,
                Attributes: action.payload
            }

        default:
            return state;
    }

};


export default attributesReducer;



