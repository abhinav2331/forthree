import { GET_ALL_UOM } from './action.type';
import { forGet } from "../component/common/api.call";


export function getUom() {
    return function (dispatch) {
        debugger;
        forGet(`uom/getalluom/14`)
            .then(response => {
            dispatch({ type: GET_ALL_UOM, payload: response.data.uomList });
            console.log(response.data.uomList);
            }).catch((error) => {               
                console.log(error.response);
            });
    };
};



