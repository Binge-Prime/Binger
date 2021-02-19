import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../store/singleUser";

export class UpdateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(ev) {
		this.setState({ [ev.target.name]: ev.target.value });
	}

	handleSubmit() {
		this.props.handleUpdateUser(this.props.id, this.state);
		this.setState({ name: "", email: "", password: "" });
	}

	render() {
		return (
			<div>
				<h2>Update My Profile</h2>
				<form>
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="text"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="text"
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</form>
				<button type="submit" onClick={this.handleSubmit}>
					Save Changes
				</button>
			</div>
		);
	}
}

const mapState = () => {
	return null;
};

const mapDispatch = (dispatch) => {
	return {
		handleUpdateUser: (id, data) => dispatch(updateUser(id, data)),
	};
};

export default connect(mapState, mapDispatch)(UpdateUser);