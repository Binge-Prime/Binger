import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../store/users'


class AdminUsers extends Component {
    componentDidMount() {
        this.props.init();
        this.handleDestroy = this.handleDestroy.bind(this);
    }
    handleDestroy(e) {
        this.props.removeUser(e.target.value);
    }
    render () {
        const { users } = this.props;
        return (
            <div>
                <table id='admin-users-table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        { users.map((user) => {
                            return (
                                <tr key={ user.id } id='admin-users-row'>
                                    <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                                    <td>{ user.email }</td>
                                    <td>{ user.name }</td>
                                    <td>{ user.lastname }</td>
                                    <td id='admin-users-buttons'>                                       
                                        <Link to={`/users/update/${user.id}`}>
                                            <button type='button' className='button-action'>Edit</button>
                                        </Link>
                                        <button type='button' className='button-delete' value={user.id} onClick={(e) => this.handleDestroy(e)}>Delete</button>
                                        <Link to={`/users/update/${user.id}/orderhistory`}>
                                            <button type='button' className='button-action'>View Order History</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        isLoggedIn: !!state.auth.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => dispatch(fetchUsers()),
        removeuser: (id) => dispatch(deleteUsers(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);