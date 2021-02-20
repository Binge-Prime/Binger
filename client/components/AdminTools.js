import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AdminTools = ({ isLoggedIn }) => (
    <div>
        <h2>Admin Tools</h2>
        { isLoggedIn ? // needs to check for Admin role, nt just logged in user //
            (
                <div id='adminLinks'>
                    <Link to='/admin-products'>Edit Products</Link>
                    <Link to='/products/create'>Create Product</Link>
                    <Link to='/admin-users'>Edit Users</Link>
                </div>
            ) : (
                <p>Access Not Authorized</p>)
        }
    </div>
)

const mapState = state => {
    return {
        isLoggedIn: !!state.auth.id
    }
}

export default connect(mapState)(AdminTools)