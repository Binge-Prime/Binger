import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AdminTools = ({ isLoggedIn }) => (
    <div>
        <h2>Admin Tools</h2>
        { isLoggedIn ? // needs to check for Admin role //
            (
                <div id='adminLinks'>
                    <Link to='/adminAllProducts'>Edit Products</Link>
                    <Link to='/product/create'>Create Product</Link>
                    <Link to='/adminAllUsers'>Edit Users</Link>
                    <Link to='/user/create'>Create User</Link>
                </div>
            ) : (<p>Access Not Authorized</p>)
            }
    </div>
)

const mapState = state => {
    return {
        isLoggedIn: !!state.auth.id
    }
}

export default connect(mapState)(AdminTools)