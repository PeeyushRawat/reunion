import axios from 'axios'

import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ALL_CITIES_REQUEST,
    ALL_CITIES_SUCCESS,
    ALL_CITIES_FAIL,
    CLEAR_ERRORS
 } from '../constants/productConstants';

 export const getProducts = (keyword = '', currentPage = 1, price, category, rating=0, city='', startDate = Date.now + (60*24*60*60*1000)) => async(dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST })

        let link = `/api/list-properties?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}&availableFrom[lte]=${startDate}&city=${city}`

        if (category) {
            link =`/api/list-properties?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&propertyType=${category}&ratings[gte]=${rating}&availableFrom[lte]=${startDate}&city=${city}`
        }



        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
 }


 export const getProductDetails = (id) => async(dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/property/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
 }

 export const getCities = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CITIES_REQUEST })

        const { data } = await axios.get('/api/allCities')

        dispatch({
            type: ALL_CITIES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_CITIES_FAIL,
            payload: error.response.data.message
        })
    }
 }

 // Claer Errors
 export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })    
 }

 