import { combineReducers } from "redux";
import uomReducer from "./uom.reducer";
import attributesReducer from "./attributes.reducer";
import attributeValueReducer from "./attribute.value.reducer";
import suppliersReducer from "./suppliers.reducer";
import businessTypeDivisionReducer from "./business.type.division.reducer";


//combine reducers
const reducers = combineReducers({
    UomReducer: uomReducer,
    AttributeReducer: attributesReducer,
    AttributeValueReducer: attributeValueReducer,
    SupplierReducer: suppliersReducer,
    BusinessTypeDiviReducer: businessTypeDivisionReducer
});

export default reducers;