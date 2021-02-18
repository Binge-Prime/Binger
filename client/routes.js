import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup, Home, AdminTools, AllProducts, productForm, SingleProduct, Cart } from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  //home screen should be our all of our products, added redirect to AllProduct component
  render() {
    const { isLoggedIn } = this.props
    return (
      <div>
        {/* will need to display Home and AllProducts for Guests && add functionality to tell Guests to log in if they try to create an Order */}
        {/* TBD: may consider adding functionality to check for Admin rights to open up some of the Admin-related routes*/}
        {isLoggedIn ? (
          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/admin' component={AdminTools} />
            <Route exact path='/products' component={AllProducts} />
            <Route path='/cart' component={Cart} />
            <Route path='/product/:id' component={SingleProduct} />
            <Route path='/products/create' component={productForm} />
            <Route path='/products/update/:id' component={productForm} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/home' component={Home} />
            <Route path='/products' component={AllProducts} />
            <Route  path='/product/:id' component={SingleProduct} />
            <Redirect to="/products" />
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
