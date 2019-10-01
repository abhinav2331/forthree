import { GET_ALL_ATTRIBUTE_VALUE } from '../actions/action.type';

const attributeValueReducer = (state = { Attributevalue: [] }, action) => {
    //debugger;
    switch (action.type) {
        case GET_ALL_ATTRIBUTE_VALUE:
            return {
                ...state,
                Attributevalue: action.payload
            }

        default:
            return state;
    }

};


export default attributeValueReducer;



