import axios from "axios";

const initialState = [];

// for admins
export const fetchUsers = () => {
	return async (dispatch) => {
		const response = await axios.get("/api/users");
		dispatch(setUsers(response.data));
	};
};

export const setUsers = (users) => ({
	type: "SET_USERS",
	users,
});

export const deleteUser = (userId) => {
	return async (dispatch) => {
		const deletedUser = await axios.delete(
			`/api/users/delete/${userId}`
		);
		if (deletedUser) {
			dispatch({ type: "DELETE_USER", id: userId });
		}
	};
};


export default function UsersReducer(state = initialState, action) {
	switch (action.type) {
		case "SET_USERS":
			return action.users;
		case "DELETE_USER":
			return state.filter((user) => user.id !== action.id);
		default:
			return state;
	}
}
