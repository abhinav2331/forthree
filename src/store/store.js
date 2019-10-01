import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers/index";

//--- MIDDLEWARE
// add middleware inside this function
const middleware = applyMiddleware(thunk);


//--- STORE
const store = createStore(reducers, middleware);

export default store;
