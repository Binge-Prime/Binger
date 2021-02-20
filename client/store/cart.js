import axios from 'axios'

// Initial State
const initialState = { orders: [], isOpen: true }

// Constants
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ORDER = 'DELETE_ORDER'
const EMPTY_CART = 'EMPTY_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const OPEN_CART = 'OPEN_CART'

// Action Creators
export const _setCart = (orders, isOpen) => ({ type: SET_CART, orders, isOpen });
export const _addToCart = (order) => ({ type: ADD_TO_CART, order});
export const _deleteOrder = (order) => ({ type: DELETE_ORDER, order})
export const _emptyCart = (cart, isOpen) => ({ type: EMPTY_CART, cart, isOpen })
export const _updateQuantity = (order) => ({ type: UPDATE_QUANTITY, order })
export const _openCart = (cart, isOpen) => ({ type: OPEN_CART, cart, isOpen })

// Thunks

// Grab the user's cart
export const fetchCart = (userId) => {
    return async(dispatch) => {
        const cart = (await axios.get(`/api/cart/${userId}`)).data
        dispatch(_setCart(cart.orders, true))
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

// Updates quantity of item in order
export const updateQuantity = (orderId, quantity) => {
    return async(dispatch) => {
        const order = (await axios.put(`/api/cart/update/${ orderId }`, { quantity })).data
        dispatch(_updateQuantity(order))
    }
}

// Opens cart
export const openCart = (userId) => {
    return async(dispatch) => {
        const cart = (await axios.put(`/api/cart/open/${ userId }`)).data
        dispatch(_openCart(cart, true))
    }
}

// Empties user's cart
export const emptyCart = (userId) => {
    return async (dispatch) => {
        const cart = (await axios.put(`/api/cart/clear/${ userId }`)).data
        dispatch(_emptyCart(cart, false))
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
            return { ...state, orders : action.orders, isOpen: action.isOpen }
        case ADD_TO_CART:
            return { ...state, orders: [...state.orders, action.order] }
        case DELETE_ORDER:   
        return { ...state, orders: state.orders.filter(order => order.id !== action.order.id) }
        case EMPTY_CART:
            return { ...state, orders: action.cart.orders, isOpen: action.isOpen }
        case UPDATE_QUANTITY:
            return { ...state, orders: state.orders.map(order => order.id === action.order.id ? action.order : order) }
        case OPEN_CART:
            return { ...state, orders: action.cart.orders, isOpen: action.isOpen }
        default:
            return state
    }
}