import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AdminTools = ({ isLoggedIn }) => (
    <div className='container justify-content-center align-items-center'>
        { isLoggedIn ? // needs to check for Admin role, nt just logged in user //
            (
                <div className="container justify-content-center btn-group" role="group" id='adminLinks'>
                    <Link className='btn btn-primary' to='/admin-products'>Edit Products</Link>
                    <Link className='btn btn-primary' to='/products/create'>Create Product</Link>
                    <Link className='btn btn-primary' to='/admin-users'>Edit Users</Link>
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