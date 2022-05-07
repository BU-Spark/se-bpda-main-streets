import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import districtReducer from "./reducers/districtReducer";
import mapBoundaryReducer from "./reducers/mapBoundaryReducer";
import mapDistrictsReducer from "./reducers/mapDistrictsReducer";
import mapBusinessReducer from "./reducers/mapBusinessReducer";
import businessReducer from "./reducers/businessReducer";
import userReducer from "./reducers/userReducer";
import windowSizeReducer from "./reducers/windowSizeReducer";

const reducer = combineReducers({
    district: districtReducer,
    mapBoundary: mapBoundaryReducer,
    mapDistricts: mapDistrictsReducer,
    mapBusiness: mapBusinessReducer,
    business: businessReducer,
    user: userReducer,
    windowSize: windowSizeReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store