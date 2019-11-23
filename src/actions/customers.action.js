import { GET_ALL_CUSTOMERS } from './action.type';
import { forGet } from "../component/common/api.call";

var userId = sessionStorage.currentUserId;

export function getCustomers() {
    return function (dispatch) {
        debugger;
        forGet(`customers/allcustomer/${userId}`)
            .then(response => {
                dispatch({ type: GET_ALL_CUSTOMERS, payload: response.data.customerList });
                console.log("******");
                console.log(response.data.customerList);
            }).catch((error) => {               
                console.log(error.response);
            });
    };
};



