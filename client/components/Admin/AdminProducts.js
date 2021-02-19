import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct, updateProduct } from '../../store/products'

class AdminProducts extends Component {
    constructor() {
        super();
        this.state = {
            selectedProducts: [],
        }
    }    
    componentDidMount() {
        this.props.init();
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleBulkDestroy = this.handleBulkDestroy.bind(this);
    }
    handleDestroy(e) {
        this.props.removeProduct(e.target.value);
    }
    handleBulkDestroy() {
        const { selectedProducts } = this.state;
        selectedProducts.forEach(product => {
            this.props.removeProduct(product.id)
        });
        this.setState({
            selectedProducts: []
        });
    }
    updateSelection(e) {
        const { selectedProducts } = this.state;
        if (e.target.checked) {
            const product = this.props.products.find(product => product.id === e.target.value * 1);
            this.setState({
                selectedProducts: [...selectedProducts, product]
            })
        } else {
            this.setState({
                selectedProducts: selectedProducts.filter(product => product.id !== e.target.value * 1)
            })
        }
    }
    handleClearSelection() {
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
        this.setState({
            selectedProducts: []
        });
    }
    submitReorder(e) {
        e.preventDefault();
        const reorderQuantity = document.getElementById(`reorderQtyforProd${e.target.value}`).value;
        const product = this.props.products.find(product => product.id === e.target.value * 1);
        const newQuantity = (product.quantity*1 + reorderQuantity*1);
        this.props.editProduct({ ...product, quantity: newQuantity });
        document.getElementById(`reorderQtyforProd${e.target.value}`).value = '';
    }
    render () {
        const { products } = this.props;
        return (
            <div>
                {/* top section menu */}
                <div id='admin-products-top'>
                    <div id='adminprod-top-select'>
                        Selected Products: {this.state.selectedProducts.length}
                        <button type='button' className='button-delete' onClick={() => this.handleBulkDestroy()}>Delete Selected</button>
                        <button type='button' className='button-action' onClick={() => this.handleClearSelection()}>Clear Selection</button>
                    </div>
                </div>
                {/* all products table */}
                <table id='adminprod-table'>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Available Qty</th>
                            <th>Reorder Qty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map((product) => {
                            return (
                                <tr key={ product.id } id='adminprod-table-row'>
                                    <td><input type="checkbox" value={product.id} onChange={(e) => this.updateSelection(e)}></input></td>
                                    <td><Link to={`/product/${product.id}`}>{product.name}</Link></td>
                                    <td>{ product.category }</td>
                                    <td>{ product.price }</td>
                                    <td>{product.quantity}</td>
                                    <td><input type='number' id={`reorderQtyforProd${product.id}`} min='0'/></td>
                                    <td id='adminprod-table-main-buttons'>                                       
                                        <Link to={`/products/update/${product.id}`}>
                                            <button type='button' className='button-action'>Edit</button>
                                        </Link>
                                        <button type='button' className='button-delete' value={product.id} onClick={(e) => this.handleDestroy(e)}>Delete</button>
                                        <button type='button' className='button-action' value={product.id} onClick={(e) => this.submitReorder(e)}>Reorder</button>
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
        removeProduct: (id) => dispatch(deleteProduct(id)),
        editProduct: (product) => dispatch(updateProduct(product)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);