import { GET_ALL_ATTRIBUTES } from './action.type';
import { forGet } from "../component/common/api.call";


export function getAllAttributes() {
    return function (dispatch) {
        forGet(`attributes/allAttribute/14`)
            .then(response => {
                dispatch({
                    type: GET_ALL_ATTRIBUTES,
                    payload: response.data.attributeList
                });
                console.log(response.data.attributeList);
                //}).catch(() => {
                //    dispatch(('Bad Login Info'));
                //});
            }).catch((error) => {
                // Error
                console.log(error.response);
            });
    };
};



