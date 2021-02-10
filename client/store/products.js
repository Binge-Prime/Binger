import axios from 'axios';

// Initial State
const initialState = {
    products: [],
    selectedProduct: {}
}

// Constants
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT'

// Actions
export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

export const setSelectedProduct = (selectedProduct) => ({
    type: SET_SELECTED_PRODUCT,
    selectedProduct
})

// Thunks

// Fetches all product data
export const fetchProducts = () => {
    return async(dispatch) => {
        const products = (await axios.get('/api/products')).data
        dispatch(setProducts(products))
    }
}

// Fetches single product data
export const fetchProduct = ( id ) => {
    return async(dispatch) => {
        const product = (await axios.get(`/api/products/${ id }`)).data
        dispatch(setSelectedProduct(product))
    }
}

export default function productReducer (state=initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.products }
        case SET_SELECTED_PRODUCT:
            return { ...state, selectedProduct: action.selectedProduct }
        default:
            return state
    }
}