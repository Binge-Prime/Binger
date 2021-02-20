import axios from 'axios';

// INITIAL STATE
const initialState = { products: [], selectedProduct: {} }

// CONSTANTS
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const FETCH_ORDERS = "FETCH_ORDERS"
const ADD_TO_ORDERS = "ADD_TO_ORDERS"
const DELETE_ORDER = "DELETE_ORDER"
const EMPTY_CART = "EMPTY_CART"
// ACTIONS (Q: do we need to export these?)
export const setProducts = (products) => ({ type: SET_PRODUCTS, products });
export const setSelectedProduct = (selectedProduct) => ({ type: SET_SELECTED_PRODUCT, selectedProduct });
export const _createProduct = (product) => ({ type: CREATE_PRODUCT, product });
export const _updateProduct = (product) => ({ type: UPDATE_PRODUCT, product });
export const _deleteProduct = (product) => ({ type: DELETE_PRODUCT, product });
export const _setCartItems = (userOrders) => ({ type: FETCH_ORDERS, userOrders });
export const _addToOrders = (order) => ({ type: ADD_TO_ORDERS, order});
export const _deleteCartOrder = (orderToDelete) => ({ type: DELETE_ORDER, orderToDelete})
export const _emptyCart = () => ({ type: EMPTY_CART })
// THUNKS
//grab all the orders that belong to specific user
export const fetchOrders = (userId) => {
    return async(dispatch) => {
        const userOrders = (await axios.get(`/api/cart/${userId}`)).data
        //dispatch the users orders
        dispatch(_setCartItems(userOrders))
    }
}

// grabs the userId and current productId from our singleProduct components onClick 
export const addOrder = (userId, productId) => {
    return async(dispatch) => {
        //console.log('WE HERE USERID and PRODUCTID', userId, productId);
        //pass in productId so we can use it to find product in our backend/routes
        const order = (await axios.post(`/api/cart/${userId}`, {productId})).data
        dispatch(_addToOrders(order))
    }
}
// fetches all product data
export const fetchProducts = () => {
    return async(dispatch) => {
        const products = (await axios.get('/api/products')).data
        dispatch(setProducts(products))
    }
}
// fetches single product data
export const fetchProduct = (id) => {
    return async(dispatch) => {
        const product = (await axios.get(`/api/products/${ id }`)).data
        dispatch(setSelectedProduct(product))
    }
}
// add new single product
export const createProduct = (product) => {
    return async (dispatch) => {
        const newProduct = (await axios.post(`/api/products/create`, product)).data
        dispatch(_createProduct(newProduct))
    }
}

// edit existing single product
export const updateProduct = (product) => {
    return async (dispatch) => {
        const updatedProduct = (await axios.put(`/api/products/update/${ product.id }`, product)).data
        dispatch(_updateProduct(updatedProduct))
    }
}

export const emptyCart = (id) => {
    return async (dispatch) => {
        console.log("ID FROM THUNK", id);
        const order = (await axios.put(`/api/cart/${id}`)).data
        dispatch(_emptyCart)
    }
}

// delete existing single product
export const deleteProduct = (id) => {
    return async (dispatch) => {
        const deletedProduct = (await axios.delete(`/api/products/delete/${ id }`)).data
        dispatch(_deleteProduct(deletedProduct))
    }
}
export const deleteCartOrder = (id, orderName) => {
    return async (dispatch) => {
        console.log(id);
        const deleteOrder = (await axios.put('/api/cart/delete', {id, orderName})).data
        dispatch(_deleteCartOrder(deleteOrder))
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
            return { ...state, products: state.products.map(product => product.id === action.product.id ? action.product : product) }
        case DELETE_PRODUCT:
            return { ...state, products: state.products.filter(product => product.id !== action.product.id) }
        case FETCH_ORDERS:
            return { ...state, userOrders : action.userOrders }
        // splats out the state and sends users order      
        case ADD_TO_ORDERS:
            return { ...state, order: action.order }
        case DELETE_ORDER:   
            return {...state, order: action.orderToDelete } 
        case EMPTY_CART:
            return state 
        default:
            return state
    }
}