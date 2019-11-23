import { GET_ALL_SUPPLIERS } from './action.type';
import { forGet } from "../component/common/api.call";

var userId = sessionStorage.currentUserId;

export function getSuppliers() {
    return function (dispatch) {
        //debugger;
        forGet(`suppliers/allsupplier/${userId}`)
            .then(response => {
                dispatch({ type: GET_ALL_SUPPLIERS, payload: response.data.supplierList });
                console.log(response.data.supplierList);
            }).catch((error) => {               
                console.log(error.response);
            });
    };
};



