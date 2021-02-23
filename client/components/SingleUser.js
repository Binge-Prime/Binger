import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getUser } from "../store/users";

export class SingleUser extends React.Component {
	constructor() {
		super();
		this.state = {
			viewUserOrders: false,
		}
	}
	componentDidMount() {
		this.props.init(this.props.match.params.id);
	}
	toggleViewOrders() {
		this.setState({
			viewUserOrders: true,
		});
	}
	render() {
		const { user } = this.props;
		const { viewUserOrders } = this.state;
		return (
			<div className='text-center'>
				<h2 className='text-dark display-1'>Welcome back, { user.firstName }</h2>
				<div id='user-info'>
					<img id='user-photo' src={ user.photo } />
					<div>customer since | -- sign up date -- |</div>
					<div id='user-email'>{ user.email }</div>
					<div id='user-address'>{ user.address }</div>
				</div>
				<div id='user-buttons'>
					<Link to={`/users/update/${ user.id }`}>
						<button type='button' className='btn btn-primary'>Update Account Info</button>
					</Link>

				</div>
				{ viewUserOrders && 
					<p>user.orders.map(order)</p>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.selectedUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		init: (id) => dispatch(getUser(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);