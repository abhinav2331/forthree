import { GET_ALL_SUPPLIERS } from '../actions/action.type';

const suppliersReducer = (state = { Suppliers: []}, action) => {
    //debugger;
    switch (action.type) {
        case GET_ALL_SUPPLIERS:
            return { ...state, Suppliers: action.payload }

        default:
            return state;
    }

};


export default suppliersReducer;



