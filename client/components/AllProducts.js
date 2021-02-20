import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../store/products'
import { addOrder } from '../store/cart'


class AllProducts extends Component {
    componentDidMount () {
        this.props.init();
        this.handleDestroy = this.handleDestroy.bind(this);
    }
    handleDestroy(e) {
        this.props.removeProduct(e.target.value);
    }
    render () {
        const { products, isLoggedIn, userId, addToCart } = this.props;
        return (
            <div>
                <ul id='all-products-list'>
                    { products.map((product) => {
                        return (
                            <div key={ product.id }id='product-tile-body'>
                                <Link to={`/product/${product.id}`}>
                                <li>
                                    <img className='thumbnail' src={product.ImgUrl}/>
                                    <ul id='product-tile-info'>
                                        <li>{ product.name }</li>
                                        <li>${ product.price }</li>
                                        { product.quantity === 0 ? 
                                        <li id='sold-out'>SOLD OUT</li> : 
                                        null
                                        }
                                    </ul>
                                </li>
                                </Link>
                                { isLoggedIn && product.quantity !== 0 ? (
                                    <div id='product-tile-buttons'>
                                        <button type='button' className='button-enter' onClick={() => addToCart(userId, product.id)} >Add to Cart</button>
                                    </div>
                                ) : (<br/>)
                                }
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        isLoggedIn: !!state.auth.id,
        userId: state.auth.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => dispatch(fetchProducts()),
        removeProduct: (id) => dispatch(deleteProduct(id)),
        addToCart: (userId, productId) => dispatch(addOrder(userId, productId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);