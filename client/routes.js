import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup, Home, AdminTools, AdminProducts, AllProducts, ProductForm, UserForm, SingleProduct, Cart, SingleUser, AdminUsers  } from './components'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    const { isLoggedIn } = this.props
    return (
      <div className='bg-secondary'>
        {isLoggedIn ? (
          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/products' component={AllProducts} />
            <Route path='/product/:id' component={SingleProduct} />
            <Route path='/cart' component={Cart} />
            <Route path='/account/:id' component={SingleUser} />
            <Route path='/users/update/:id' component={UserForm} />

            <Route exact path='/admin' component={AdminTools} />
            <Route path='/admin-products' component={AdminProducts} />
            <Route path='/products/create' component={ProductForm} />
            <Route path='/products/update/:id' component={ProductForm} />
            <Route path='/admin-users' component={AdminUsers} />
            <Route path='/users/create' component={UserForm} />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/home' component={Home} />
            <Route path='/products' component={AllProducts} />
            <Route path='/product/:id' component={SingleProduct} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
