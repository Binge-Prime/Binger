import axios from "axios";

const initialState = {};

export const setUser = (user) => {
	return {
		type: "SET_USER",
		user,
	};
};

export const fetchUser = (id) => {
	return async (dispatch) => {
		const response = await axios.get(`/api/users/${id}`);
		dispatch(setUser(response.data));
	};
};

export const updateUser = (id, user) => {
	return async (dispatch) => {
		const response = await axios.put(`/api/users/update/${id}`, user);
		dispatch(updateUser(JSON.parse(response.config.data)));
	};
};

export default function usertReducer(state = initialState, action) {
	switch (action.type) {
		case "SET_USER":
			return action.user;
		case "UPDATE_USER":
			return { ...state, ...action.user };
		default:
			return state;
	}
}