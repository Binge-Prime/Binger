import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../store/products'


class AdminProducts extends Component {
    componentDidMount () {
        this.props.init();
        this.handleDestroy = this.handleDestroy.bind(this);
    }
    handleDestroy(e) {
        this.props.removeProduct(e.target.value);
    }
    addInventoryOrder(e) {
        console.log('added to inventory order');
    }
    render () {
        const { products } = this.props;
        return (
            <div>
                <table id='admin-products-table'>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Average Rating</th>
                            <th>Weekly Orders</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map((product) => {
                            return (
                                <tr key={ product.id } id='admin-products-row'>
                                    <td><Link to={`/product/${product.id}`}>{product.name}</Link></td>
                                    <td>{ product.category }</td>
                                    <td>{ product.price }</td>
                                    <td>{ product.quantity }</td>
                                    <td>product.avgRating</td>
                                    <td>product.orders</td>
                                    <td id='admin-products-buttons'>                                       
                                        <Link to={`/products/update/${product.id}`}>
                                            <button type='button' className='button-action'>Edit</button>
                                        </Link>
                                        <button type='button' className='button-delete' value={product.id} onClick={(e) => this.handleDestroy(e)}>Delete</button>
                                        <button type='button' className='button-action' value={product.id} onClick={(e) => this.addInventoryOrder(e)}>Add Inventory</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);