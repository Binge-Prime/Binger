import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchOrders } from '../store/products'


// Displays single product
class Cart extends Component {
    async componentDidMount () {
        // Fetch product data
        
        const orderItems = await this.props.orderItems(this.props.auth.id);        
        
    }

    render () {
        // code broke without this line 
        if(!this.props.products.userOrders){
            return (
                <p>No Items in cart...</p>
            )
        }
        const userOrders = (this.props.products.userOrders.products).map(order => {
            return JSON.parse(order)
        });
        return (
            <div>
                {userOrders.map(order => {
                    return (
                        <div key={order.id}>
                            <img className='thumbnail' src={order.ImgUrl}/>
                            <h3>{order.name}</h3>
                            <h4>{`$ ${order.price}`}</h4>
                        </div>
                    )
                })}
            </div>
        )
 
    }

}
const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        orderItems: (id) => dispatch(fetchOrders(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);





