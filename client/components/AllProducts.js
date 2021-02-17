import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../store/products'


class AllProducts extends Component {
    componentDidMount () {
        this.props.init();
        this.handleDestroy = this.handleDestroy.bind(this);
    }
    handleDestroy(e) {
        this.props.removeProduct(e.target.value);
    }
    render () {
        const { products, isLoggedIn } = this.props;
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
                                        {/* <li> { product.avgRating } </li> */}
                                    </ul>
                                </li>
                                </Link>
                                { isLoggedIn ? (
                                    <div id='product-tile-buttons'>
                                        <button type='button' className='button-enter' onClick={() => console.log('item added to cart')} >Add to Cart</button>
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
        isLoggedIn: !!state.auth.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => dispatch(fetchProducts()),
        removeProduct: (id) => dispatch(deleteProduct(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);