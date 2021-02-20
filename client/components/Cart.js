import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchCart, deleteOrder, emptyCart } from '../store/cart'

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
        this.props.history.go(0)           
    }

    handlePurchase(id) {
        this.props.emptyCart(id);
        this.props.history.go(0)
    }

    handleChange(id, price, quantity) {
        const orderPrice = document.getElementById(id);
        console.log(quantity, price);
        orderPrice.innerHTML = `$${ price }`
    }

    render () {
        const { orders } = this.props;

        if (!orders || orders.length === 0) {
            return (
                <div>
                    <h1> Your cart is empty! Go check out our awesome products under the 'Products' tab :)</h1>
                </div>
            )
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
                                    <td>{product.name}</td>
                                    <td>   </td>
                                    <td id={product.id}>{`$${product.price}`}</td>
                                    <td>   </td>
                                    <td>
                                        <select onChange={() => this.handleChange(product.id, product.price, this.value)}>
                                            {options.map((num) => {
                                                return (
                                                    <option key={ 'option' + num }>{ num }</option>
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
                    <button onClick={() => this.handlePurchase(this.props.userId)} type='button' >Purchase</button>
            </div>
        )
 
    }

}
const mapStateToProps = (state) => {
    return {
        orders: state.cart.orders,
        userId: state.auth.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: (id) => dispatch(fetchCart(id)),
        deleteOrder: (id, productId) => dispatch(deleteOrder(id, productId)),
        emptyCart: (id) => dispatch(emptyCart(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

