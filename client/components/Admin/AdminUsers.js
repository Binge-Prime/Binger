import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, deleteUser, updateUser } from '../../store/users'


class AdminUsers extends Component {
    constructor() {
        super();
        this.state = {
            selectedUsers: [],
        }
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleBulkDestroy = this.handleBulkDestroy.bind(this);
    }    
    componentDidMount() {
        this.props.init();
    }
    handleDestroy(e) {
        this.props.deleteUser(e.target.value);
    }
    handleBulkDestroy() {
        const { selectedUsers } = this.state;
        selectedUsers.forEach(user => {
            this.props.deleteUser(user.id)
        });
        this.setState({
            selectedUsers: []
        });
    }
    updateSelection(e) {
        const { selectedUsers } = this.state;
        if (e.target.checked) {
            const user = this.props.users.find(user => user.id === e.target.value * 1);
            this.setState({
                selectedUsers: [...selectedUsers, user]
            })
        } else {
            this.setState({
                selectedUsers: selectedUsers.filter(user => user.id !== e.target.value * 1)
            })
        }
    }
    handleClearSelection() {
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
        this.setState({
            selectedUsers: []
        });
    }
    render () {
        const { users } = this.props;
        return (
            <div>
                <div id='admin-models-top'>
                    <div id='admin-models-top-select'>
                        Selected Users: {this.state.selectedUsers.length}
                        <button type='button' className='button-delete' onClick={() => this.handleBulkDestroy()}>Delete Selected</button>
                        <button type='button' className='button-action' onClick={() => this.handleClearSelection()}>Clear Selection</button>
                    </div>
                </div>


                <table id='admin-models-table'>
                    <thead>
                        <tr>
                            <th>Select</th> 
                            <th>Email</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        { users.map((user) => {
                            return (
                                <tr key={ user.id } id='admin-models-row'>
                                    <td><input type="checkbox" value={user.id} onChange={(e) => this.updateSelection(e)}></input></td>
                                    <td>{ user.email }</td>
                                    <td>{ user.name }</td>
                                    <td>{ user.lastname }</td>
                                    <td id='admin-models-buttons'>                                       
                                        <Link to={`/account/${user.id}`}>
                                            <button type='button' className='button-action'>View</button>
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
        init: () => dispatch(getAllUsers()),
        deleteUser: (id) => dispatch(deleteUser(id)),
        updateUser: (user) => dispatch(updateUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);