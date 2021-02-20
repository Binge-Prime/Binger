import axios from 'axios'

// Initial State
const initialState = { orders: [] }

// Constants
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ORDER = 'DELETE_ORDER'
const EMPTY_CART = 'EMPTY_CART'

// Action Creators
export const _setCart = (orders) => ({ type: SET_CART, orders });
export const _addToCart = (order) => ({ type: ADD_TO_CART, order});
export const _deleteOrder = (order) => ({ type: DELETE_ORDER, order})
export const _emptyCart = (cart) => ({ type: EMPTY_CART, cart })

// Thunks

// Grab the user's cart
export const fetchCart = (userId) => {
    return async(dispatch) => {
        const cart = (await axios.get(`/api/cart/${userId}`)).data
        dispatch(_setCart(cart.orders))
    }
}

// Grabs the userId and current productId from our singleProduct components onClick 
export const addOrder = (userId, productId) => {
    return async(dispatch) => {
        //pass in productId so we can use it to find product in our backend/routes
        const order = (await axios.post(`/api/cart/${userId}`, {productId})).data
        dispatch(_addToCart(order))
    }
}

// Empties user's cart
export const emptyCart = (id) => {
    return async (dispatch) => {
        const cart = (await axios.put(`/api/cart/clear/${id}`)).data
        dispatch(_emptyCart(cart))
    }
}

// Delete single existing order
export const deleteOrder = (id) => {
    return async (dispatch) => {
        const deleteOrder = (await axios.put(`/api/cart/delete/${ id }`)).data
        dispatch(_deleteOrder(deleteOrder))
    }
}

//Reducer
export default function cartReducer (state=initialState, action) {
    switch (action.type) {
        case SET_CART:
            return { ...state, orders : action.orders }
        case ADD_TO_CART:
            return { ...state, orders: [...state.orders, action.order] }
        case DELETE_ORDER:   
        return { ...state, orders: state.orders.filter(order => order.id !== action.order.id) }
        case EMPTY_CART:
            return { ...state, orders: cart.orders }
        default:
            return state
    }
}