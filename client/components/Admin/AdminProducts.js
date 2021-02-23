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
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleBulkDestroy = this.handleBulkDestroy.bind(this);
    }    
    componentDidMount() {
        this.props.init();
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
            <div className='container justify-content-center'>
                <div className='row justify-content-around' id='admin-models-top-select'>
                    <h4>Selected Products: {this.state.selectedProducts.length}</h4>
                    <button type='button' className='btn btn-warning' onClick={() => this.handleClearSelection()}>Clear Selection</button>
                    <button type='button' className='btn btn-danger' onClick={() => this.handleBulkDestroy()}>Delete Selected</button>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className='table table-dark table-image'>
                                <thead className='thead-light'>
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
                                            <tr key={ product.id } id='admin-models-row'>
                                                    <td><input type="checkbox" className='on-off-btn' value={product.id} onChange={(e) => this.updateSelection(e)}></input></td>
                                                <td><Link to={`/product/${product.id}`}>{product.name}</Link></td>
                                                <td>{ product.category }</td>
                                                <td>{ product.price }</td>
                                                <td>{product.quantity}</td>
                                                <td><input type='number' id={`reorderQtyforProd${product.id}`} min='0'/></td>
                                                <td id='admin-models-buttons' className='container justify-content-center'>                                       
                                                    <Link to={`/products/update/${product.id}`}>
                                                        <button type='button' className='btn btn-warning'>Edit</button>
                                                    </Link>
                                                    <button type='button' className='btn btn-danger' value={product.id} onClick={(e) => this.handleDestroy(e)}>Delete</button>
                                                    <button type='button' className='btn btn-success' value={product.id} onClick={(e) => this.submitReorder(e)}>Reorder</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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