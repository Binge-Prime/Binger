import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchProducts } from '../store/products'


class AllProducts extends Component {
    componentDidMount () {
        this.props.init();
    }
    render () {
        const { products } = this.props;
        return (
            <div>
                <ul>
                    {
                        products.map((product) => {
                            return (
                                <li key={ product.id }>
                                    <ul>
                                        <li> { product.name } </li>
                                        <li> ${ product.price } </li>
                                        {/* <li> { product.avgRating } </li> */}
                                    </ul>
                                    <button>Edit</button>
                                    <button>Delete</button>
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

const mapDispatchToProps = (dispatch) => ({
        init: () => dispatch(fetchProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);