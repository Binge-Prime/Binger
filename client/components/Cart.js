import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchCart, deleteOrder, emptyCart, openCart, updateQuantity } from '../store/cart'

// Constant
const emptyMessage = (
    <div>
        <h1> Your cart is empty! Go check out our awesome products under the 'Products' tab :)</h1>
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
        const orderPrice = document.getElementById(productId)
        this.props.updateQuantity(orderId, quantity.value)
        orderPrice.innerHTML = `$${ price * quantity.value }`
    }

    render () {
        const { orders, isOpen, userId, openCart } = this.props;

        if (!isOpen) {
            alert('Your order will arrive shortly. Thank you for shopping with Binger!')
            openCart(userId)
            return(emptyMessage)
        }

        if (orders.length === 0) {
            return (emptyMessage)
        }
        
        return (
            <div>
                <table>
                    <tbody>
                        { orders.map( ( order ) => {
                            let product = order.product;
                            const options = [...Array(product.quantity).keys()].map(num => num + 1)
                            return (
                                <tr key={ 'product' + product.id }>
                                    <td><img className='thumbnail' src={ product.ImgUrl }/></td>
                                    <td>{ product.name }</td>
                                    <td id={ product.id }>{`$ ${ product.price }`}</td>
                                    <td>
                                        <select id='select-quantity' onChange={() => this.handleChange(product.id, order.id, product.price)}>
                                            { options.map(( num ) => {
                                                return (
                                                    <option value={ num } key={ 'option' + num }>{ num }</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                    <td><button type='button' className='button-delete' onClick={() => this.handleDestroy(order.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={()=>this.handlePurchase(this.props.userId)}type='button' >Purchase</button>
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

