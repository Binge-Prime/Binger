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
            <div className='container'>
                <div className='row'>
                { products.map((product) => {
                    return (
                        <div key={ product.id } className='col' id='all-products-card-col'>
                            <div id='all-products-card' className='card text-center text-white bg-dark mb-3' style={{ width: 275 + 'px' }}>
                                <img src={product.ImgUrl} className='card-image-top bg-white'/>
                                <div id='all-products-card-product-name' className='card-body'>
                                    <h3 className='card-text'>{ product.name }</h3>
                                </div>
                                <hr></hr>
                                <div className='card-body'>
                                    <h5 className='card-text'>${ product.price }</h5>
                                    { product.quantity === 0 ? 
                                    <h2 id='sold-out' className='card-text text-danger'>SOLD OUT</h2> : 
                                    null
                                    }
                                </div>
                                { isLoggedIn && product.quantity !== 0 ? <hr></hr> : null }
                                { isLoggedIn && product.quantity !== 0 ? (
                                    <div className='card-body' id='all-products-card-button-body'>
                                        <button type='button' className='btn btn-primary' onClick={() => addToCart(userId, product.id)} >Add to Cart</button>
                                        <Link to={`/product/${product.id}`} className='card-link'> View Product </Link>
                                    </div>
                                ) : (<br/>)
                                }
                            </div>
                        </div>
                    )
                })}
                </div>
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