import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchCart, deleteOrder, emptyCart, openCart, updateQuantity } from '../store/cart'

// Constant
const emptyMessage = (
    <div className='text-center'>
        <h1 className='display-1'>Your cart is empty!</h1>
    </div>
)

// Displays user's cart
class Cart extends Component {
    componentDidMount () {
        this.props.init(this.props.userId); 

        this.handleChange = this.handleChange.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);       
    }

    handleDestroy(orderId) {
        this.props.deleteOrder(orderId);           
    }

    handlePurchase(id) {
        this.props.emptyCart(id);
    }

    handleChange(productId, orderId, price) {
        const quantity = document.getElementById('select-quantity');
        const orderPrice = document.getElementById('price' + productId)
        this.props.updateQuantity(orderId, quantity.value)
        orderPrice.innerHTML = `$${ (price * quantity.value).toFixed(2) }`
    }

    render () {
        const { orders, isOpen, userId, openCart } = this.props;

        if (!isOpen) {
            alert('Your order will arrive shortly. Thank you for shopping with Binger!')
            openCart(userId)
            return(emptyMessage)
        }

        if (!orders || orders.length === 0) {
            return (emptyMessage)
        }
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table className='table table-dark table-image'>
                            <thead className='thead-light'>
                                <tr>
                                    <th scope='col'></th>
                                    <th scope='col'>Product</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Quantity</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                { orders.map( ( order ) => {
                                    let product = order.product;
                                    const options = [...Array(product.quantity).keys()].map(num => num + 1)
                                    return (
                                        <tr key={ 'product' + product.id }>
                                            <td><img className='thumbnail' src={ product.ImgUrl }/></td>
                                            <td>{ product.name }</td>
                                            <td id={ 'price' + product.id }>{`$ ${ (product.price * order.quantity).toFixed(2) }`}</td>
                                            <td>
                                                {/* <select id='select-quantity' className='form-control form-control-sm'onChange={() => this.handleChange(product.id, order.id, product.price)}>
                                                    { options.map(( num ) => {
                                                        return (
                                                            <option value={ num } key={ 'option' + num } id={ 'option' + product.id + num }>{ num }</option>
                                                        )
                                                    })}
                                                </select> */}
                                                <input id='select-quantity' type='number' value={ order.quantity } onChange={ () => this.handleChange(product.id, order.id, product.price) } min='1'/>
                                            </td>
                                            <td><button type='button' className='btn btn-danger' onClick={() => this.handleDestroy(order.id)}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button onClick={()=>this.handlePurchase(this.props.userId)}type='button' className='btn btn-primary'>Purchase</button>
                    </div>
                </div>
            </div>
        )
 
    }

}
const mapStateToProps = (state) => {
    return {
        orders: state.cart.orders,
        userId: state.auth.id,
        isOpen: state.cart.isOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: (id) => dispatch(fetchCart(id)),
        deleteOrder: (id, productId) => dispatch(deleteOrder(id, productId)),
        emptyCart: (id) => dispatch(emptyCart(id)),
        updateQuantity: (id, quantity) => dispatch(updateQuantity(id, quantity)),
        openCart: (id) => dispatch(openCart(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

