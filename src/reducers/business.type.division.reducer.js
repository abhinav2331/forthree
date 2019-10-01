import { GET_ALL_BUSINESS_TYPE_DIVISION } from '../actions/action.type';

const businessTypeDivisionReducer = (state = { Bustypedivision: [] }, action) => {
    //debugger;
    switch (action.type) {
        case GET_ALL_BUSINESS_TYPE_DIVISION:
            return {
                ...state,
                Bustypedivision: action.payload
            }

        default:
            return state;
    }

};


export default businessTypeDivisionReducer;



