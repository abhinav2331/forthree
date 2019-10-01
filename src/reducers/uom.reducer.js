import { GET_ALL_UOM } from '../actions/action.type';

const uomReducer = (state = { Uoms: []}, action) => {
    //debugger;
    switch (action.type) {
        case GET_ALL_UOM:
            return { ...state, Uoms: action.payload }

        default:
            return state;
    }

};


export default uomReducer;



