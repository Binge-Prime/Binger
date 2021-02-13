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
                            <Link to={`/product/${product.id}`} key={ product.id }>
                            <li id='product-tile-body'  >
                                {/* need to wrap the product tile in a <Link> to redirect to SingleProduct page on click*/}
                                <img className='thumbnail' src={product.ImgUrl}/>
                                <ul id='product-tile-info'>
                                    <li>{ product.name }</li>
                                    <li>${ product.price }</li>
                                    {/* <li> { product.avgRating } </li> */}
                                </ul>
                               
                                { isLoggedIn ? (
                                    <div id='product-tile-buttons'>
                                        {/* for now, these buttons are rendered for all logged in users, but should only be available to admins; Need for "admin view" of AllProducts to be discussed */}
                                        
                                        <Link to={`/products/update/${product.id}`}>
                                            <button type='button' className='button-access'>Edit</button>
                                        </Link>
                
                                        <button type='button' className='button-delete' value={product.id} onClick={(e) => this.handleDestroy(e)}>Delete</button>
                                    </div>
                                ) : (<br/>)
                                }
                            </li>
                            </Link>
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