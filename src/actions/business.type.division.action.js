import { GET_ALL_BUSINESS_TYPE_DIVISION } from './action.type';
import { forGet } from "../component/common/api.call";


export function getBusinessTypeDivision() {
    return function (dispatch) {
        forGet(`businesstypeDivision/alldivision/14`)
            .then(response => {
                dispatch({
                    type: GET_ALL_BUSINESS_TYPE_DIVISION,
                    payload: response.data.DivisionList
                });
                console.log(response.data.DivisionList);
                //}).catch(() => {
                //    dispatch(('Bad Login Info'));
                //});
            }).catch((error) => {
                // Error
                console.log(error.response);
            });
    };
};



