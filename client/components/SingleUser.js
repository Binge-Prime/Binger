import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/singleUser";
import UpdateUser from "./UpdateUser";

export class SingleUser extends React.Component {
	componentDidMount() {
		this.props.init(this.props.userId);
	}

	
	render() {
		const { userId, userName } = props;
		if (!userName) {
			return (
				<div>
					<p>Loading ...</p>
				</div>
			);
		} else {
			return (
				<div>
					<h1>
						Welcome, {userName}!
					</h1>
					<UpdateUser id={userId} />
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({ 
	userId: state.auth.id,
	userName: state.auth.name
})

const mapDispatchToProps = (dispatch) => {
    return {
        init: (id) => dispatch(fetchUser(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);