import { GET_ALL_ATTRIBUTE_VALUE } from './action.type';
import { forGet } from "../component/common/api.call";


export function getAllAttributeValue() {
    return function (dispatch) {
        forGet(`attributesValues/attributeValues/14`)
            .then(response => {
                dispatch({
                    type: GET_ALL_ATTRIBUTE_VALUE,
                    payload: response.data.attributeValuesList
                });
                console.log(response.data.attributeValuesList);
                //}).catch(() => {
                //    dispatch(('Bad Login Info'));
                //});
            }).catch((error) => {
                // Error
                console.log(error.response);
            });
    };
};



