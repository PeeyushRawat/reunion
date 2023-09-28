import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { allCitiesReducer, productDetailsReducer, productsReducers } from './reducers/productReducers';
import { authReducer } from './reducers/userReducers';

const reducer = combineReducers({
    products: productsReducers,
    productDetails: productDetailsReducer,
    auth: authReducer,
    allCities: allCitiesReducer
})


let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;