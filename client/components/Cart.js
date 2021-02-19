import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchOrders, deleteCartOrder, emptyCart } from '../store/products'
import axios from 'axios'

// Displays single product
class Cart extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            value: this.props.price,
            disableDec: true, 
            disableInc: false
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        }

         handleDestroy(orderName) {
            this.props.removeOrder(this.props.auth.id, orderName);
            this.props.history.push('/products');            
        }
        handlePurchase(id) {
            this.props.hitPurchase(id);
            this.props.history.push('/products');
        }
        async decrement(price, id){
           
            const orderPrice = document.getElementById(id);
            orderPrice.innerHTML = `$ ${price}`;
           
        }
        async increment(price, id){
            // const User = (await axios.get(`/api/cart/${userId}`)).data
            // const usersProductsArray = User.products.map(product => {
            //     return JSON.parse(product);
            // })
            // console.log(usersProductsArray);
           
            const orderPrice = document.getElementById(id);
            orderPrice.innerHTML = `$ ${price*2}` ;
           
      }

    async componentDidMount () {
        // Fetch product data
        
        const orderItems = await this.props.orderItems(this.props.auth.id); 
        
    }
    render () {
        // code broke without this line 
        console.log(this.props);
        if(!this.props.products.userOrders){
            return (
                <p>No Items in cart...</p>
            )
        }
        let userOrders = (this.props.products.userOrders.products).map(order => {
            return JSON.parse(order)
        });
        // const uniqueSet = new Set(userOrders);
        // console.log('CART', uniqueSet);
        //console.log(userOrders);

        return (
            <div>
                {userOrders.map((order) => {
                    return (
                        <tr >
                            <img className='thumbnail' src={order.ImgUrl}/>
                            <td>{order.name}</td>
                            <td id={order.id}>{`$ ${order.price}`}</td>
                            <span className="quantity-picker">
                            <button  onClick={()=>this.decrement(order.price, order.id)}>-</button>
                            <button  onClick={()=>this.increment(order.price, order.id)}>+</button>
                            </span>
                            <button type='button' className='button-delete' value={order.id} onClick={() => this.handleDestroy(order.name)}>Delete</button>
                        </tr>
                    )
                })}
                <button onClick={()=>this.handlePurchase(this.props.auth.id)}type='button' >Purchase</button>
            </div>
        )
 
    }

}
const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        orderItems: (id) => dispatch(fetchOrders(id)),
        removeOrder: (id, orderName) => dispatch(deleteCartOrder(id, orderName)),
        hitPurchase: (id) => dispatch(emptyCart(id)) 
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

