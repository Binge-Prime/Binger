import axios from 'axios';

// INITIAL STATE
const initialState = { products: [], selectedProduct: {} }

// CONSTANTS
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// ACTIONS (Q: do we need to export these?)
export const setProducts = (products) => ({ type: SET_PRODUCTS, products });
export const setSelectedProduct = (selectedProduct) => ({ type: SET_SELECTED_PRODUCT, selectedProduct });
export const _createProduct = (product) => ({ type: CREATE_PRODUCT, product });
export const _updateProduct = (product) => ({ type: UPDATE_PRODUCT, product });

// THUNKS
// fetches all product data
export const fetchProducts = () => {
    return async(dispatch) => {
        const products = (await axios.get('/api/products')).data
        dispatch(setProducts(products))
    }
}
// fetches single product data
export const fetchProduct = ( id ) => {
    return async(dispatch) => {
        const product = (await axios.get(`/api/products/${ id }`)).data
        dispatch(setSelectedProduct(product))
    }
}
// add a single new product
export const addProduct = (product) => {
    return async (dispatch) => {
        const newProduct = (await axios.post(`/api/products/`, product)).data
        dispatch(_createProduct(newProduct))
    }
}

// edit existing single product
export const editProduct = (product) => {
    return async (dispatch) => {
        const updatedProduct = (await axios.put(`/api/products/${ product.id }`, product)).data
        dispatch(_updateProduct(updatedProduct))
    }
}

// REDUCER
export default function productReducer (state=initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.products }
        case SET_SELECTED_PRODUCT:
            return { ...state, selectedProduct: action.selectedProduct }
        case CREATE_PRODUCT:
            return { ...state, products: [...state.products, action.product] }
        case UPDATE_PRODUCT:
            return state.products.map( product => action.product.id === product.id ? action.product : product )
        default:
            return state
    }
}