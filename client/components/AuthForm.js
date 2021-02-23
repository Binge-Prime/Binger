import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className='container justify-content-center'>
      <h2 className='display-1 text-dark text-center'>{ name === 'signup' ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit} name={name}>
        {
            name === 'signup' ? 
            <div className='form-group'>
              <label htmlFor="username">
                <small>Name</small>
              </label>
              <input name="username" type="username" className='form-control'/>
            </div>
            : null
        } 
        <div className='form-group'>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" className='form-control'/>
        </div>
        <div className='form-group'>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" className='form-control'/>
        </div>
        {
          name === 'signup' ? 
          <div className='form-group'>
            <label htmlFor="githubId">
              <small>Github Username(optional)</small>
            </label>
            <input name="githubId" type="githubId" className='form-control'/>
          </div>
          : null
        }
        <div className='row justify-content-center'>
          <button type="submit" className='btn btn-primary'>{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {
        window.githubURL && <a href={window.githubURL}>Login / Register Via Github </a>
      }
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const name = evt.target.username.value
        let githubId = evt.target.githubId.value
        if (githubId === '') { githubId = null }
        dispatch(authenticate(email, password, formName, name, githubId))
        return
      }
      dispatch(authenticate(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
