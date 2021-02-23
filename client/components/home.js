import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const { name } = props

  return (
    <div className='text-center'>
      <h3 className='display-1'>Welcome, { name }</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.auth.firstName !== null ? state.auth.firstName : 'Guest User'
  }
}

export default connect(mapState)(Home)
