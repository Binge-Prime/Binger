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
        const { products } = this.props;
        console.log(this.props);
        return (
            <div>
                <ul id='all-products-list'>
                    {
                        products.map((product) => {
                            return (
                                <li id='product-tile-body' key={ product.id }>
                                    <ul id='product-tile-info'>
                                        <li> { product.name } </li>
                                        <li> ${ product.price } </li>
                                        {/* <li> { product.avgRating } </li> */}
                                    </ul>

                                    <div id='product-tile-buttons'>
                                        <Link to={`/products/update/${product.id}`}>
                                            <button type='button' className='button-access'>Edit</button>
                                        </Link>
                                        
                                        <button type='button' className='button-delete' value={product.id} onClick={(e) => this.handleDestroy(e)}>Delete</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ products: state.products.products });

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => dispatch(fetchProducts()),
        removeProduct: (id) => dispatch(deleteProduct(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);