import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Binger</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links for logged in users */}
          <Link to='/home'>Home</Link>
          <Link to='/products'>Products</Link>
          <Link to='/cart'>Cart (n/a)</Link>
          <Link to='/'>Account (n/a)</Link>
          {/* admin tools link should only to become visible if logged in with admin rights */}
          <Link to='/admin'>Admin Tools</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before users log in */}
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
    isLoggedIn: !!state.auth.id
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
