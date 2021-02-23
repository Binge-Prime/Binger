import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div className='bg-dark text-center'>
    <h1 className='display-1 text-white'>Binger</h1>
    {isLoggedIn ? (
      <div className='nav nav-tabs justify-content-around'>
        {/* The navbar will show these links for logged in users */}
        <Link className='nav-link' to='/home'>Home</Link>
        <Link className='nav-link' to='/products'>Products</Link>
        <Link className='nav-link' to='/cart'>Cart</Link>
        <Link className='nav-link' to={`/account/${ userId }`}>Account</Link>
        {/* admin tools link should only to become visible if logged in with admin rights */}
        <Link className='nav-link' to='/admin'>Admin Tools</Link>
        <a className='nav-link' href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    ) : (
      <div className='nav nav-tabs'>
        {/* The navbar will show these links before users log in */}
        <Link className='nav-link' to='/login'>Login</Link>
        <Link className='nav-link' to='/signup'>Sign Up</Link>
        <Link className='nav-link' to='/products'>Products</Link>
      </div>
    )}
  </div>
)

/** 
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id
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
