import { GET_ALL_CUSTOMERS } from '../actions/action.type';

const customerReducer = (state = { Customers: []}, action) => {
    //debugger;
    switch (action.type) {
        case GET_ALL_CUSTOMERS:
            return { ...state, Customers: action.payload }

        default:
            return state;
    }

};


export default customerReducer;



