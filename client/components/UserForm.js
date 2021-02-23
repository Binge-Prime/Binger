import React from "react";
import { connect } from "react-redux";
import { getUser, deleteUser, updateUser } from "../store/users";

export class UserForm extends React.Component {
	constructor({ user }) {
		super();
		this.state = {
			email: user.id ? user.email : '' ,
			firstName: user.id ? user.firstName : '' ,
			lastName: user.id ? user.lastName : '' ,
			address: user.id ? user.address : ''
		}
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDestroy = this.handleDestroy.bind(this);
	}
	componentDidMount() {
		this.props.init(this.props.match.params.id);
	}
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	async handleSubmit(e) {
		e.preventDefault();
		const { user, history } = this.props; 
		await this.props.updateUser({ ...this.state, id: user.id });
		history.push(`/account/${ user.id }`);
	}
	async handleDestroy() {
		const { user, history } = this.props;
		await this.props.deleteUser(user.id);
		history.push('/');
	}
	render() {
		const { email, firstName, lastName, address } = this.state;
		return (
			<div id='user-form' className='container justify-content-center'>
				<h2 className='display-1 text-dark text-center'>Update My Profile</h2>
				<form id='update-form-body' onSubmit={(e) => this.handleSubmit(e)}>
					<div className='form-group'>
						<label htmlFor="email">Email</label>
						<input
							className='form-control'
							name="email"
							type="email"
							value={email}
							onChange={(e) => this.onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor="firstName">First Name</label>
						<input
							className='form-control'
							name="firstName"
							type="text"
							value={firstName}
							onChange={(e) => this.onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor="lastName">Last Name</label>
						<input
							className='form-control'
							name="lastName"
							type="text"
							value={lastName}
							onChange={(e) => this.onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor="address">Address</label>
						<input
							className='form-control'
							name="address"
							type="text"
							value={address}
							onChange={(e) => this.onChange(e)}
						/>
					</div>
					<div id='user-form-buttons'>
						<button
							type='submit'
							className='btn btn-primary'
						>
							Submit Update </button>
						{/* destroy account button ? */}
					</div>
				</form>
			</div>
		);
	}
}

// ifAdmin, make admin toggle
// upload picutre
// change password (react) 

const mapStateToProps = (state) => {
	return {
		user: state.users.selectedUser,
	};
};

const mapDispatch = (dispatch) => {
	return {
		init: (id) => dispatch(getUser(id)),
		updateUser: (user) => dispatch(updateUser(user)),
		deleteUser: (id) => dispatch(deleteUser(id)),
	};
};

export default connect(mapStateToProps, mapDispatch)(UserForm);