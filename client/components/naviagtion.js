import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userId, isAdmin}) => (
  <div>
    <h1>Binger</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to='/products'>Products</Link>
          <Link to='/cart'>Cart</Link>
          <Link to={`/account/${userId}`}>Account</Link>
          { isAdmin ?
            <Link to='/admin'>Admin Tools</Link>
          : null }
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/products'>Products</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/** 
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
