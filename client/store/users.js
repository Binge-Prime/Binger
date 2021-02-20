import axios from "axios";

const initialState = { users: [], selectedUser: {} }

// -- CONSTANTS -- //
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USER = 'GET_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'


// -- ACTIONS -- //
export const _getAllUsers = (users) => ({ type: GET_ALL_USERS, users });
export const _getUser = (user) => ({ type: GET_USER, user });
export const _updateUser = (user) => ({ type: UPDATE_USER, user });
export const _deleteUser = (user) => ({ type: DELETE_USER, user });


// -- THUNKS -- //
export const getAllUsers = () => {
	return async (dispatch) => {
		const { data } = await axios.get('/api/users');
		dispatch(_getAllUsers(data));
	};
};

export const getUser = (id) => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/users/${ id }`);
		dispatch(_getUser(data));
	};
};

export const updateUser = (user) => {
	return async (dispatch) => {
		const { data } = await axios.put(`/api/users/update/${ user.id }`, user);
		dispatch(_updateUser(data));
	};
};

export const deleteUser = (id) => {
	return async (dispatch) => {
		const { data } = await axios.delete(`/api/users/delete/${ id }`);
		dispatch(_deleteUser(data));
	};
};


// -- USERS REDUCER -- //
export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_USERS:
			return { ...state, users: action.users };
		case GET_USER:
			return { ...state, selectedUser: action.user };
		case UPDATE_USER:
			return { ...state, users: state.users.map(user => user.id === action.user.id ? action.user : user) }
		case DELETE_USER:
			return { ...state, users: state.users.filter(user => user.id !== action.user.id) }
		default:
			return state;
	};
};
