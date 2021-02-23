import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct, updateProduct, deleteProduct } from '../../store/products';

class ProductForm extends Component {
    constructor({ product }) {
        super();
        this.state = {
            name: product.id ? product.name : '',
            category: product.id ? product.category : '',
            price: product.id ? product.price : 0,
            description: product.id ? product.description : '',
            ImgUrl: product.id ? product.ImgUrl : '',
        }
        this.onChange = this.onChange.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleDestroy() {
        const { product, history } = this.props;
        this.props.removeProduct(product.id);
        history.push('/admin-products');
    }
    handleSubmit(e) {
        // need to add error message that all fields need to be filled out before submitting (i.e. should not be bale to submit incomplete form)
        // also product name, needs to be unique (can't add multiples of same products)
        e.preventDefault();
        const { product, history } = this.props;
        if (product.id) {
            this.props.editProduct({ ...this.state, id: product.id });
            history.push('/admin-products');
        } else {
            this.props.addProduct({ ...this.state });
            history.push('/admin-products')
        }
    }
    render() {
        const { name, category, price, description, ImgUrl } = this.state;
        const { product } = this.props;
        return (
            <div id='update-form-shell' className='container justify-content-center'>
                <h3 className='display-1 text-dark text-center'>
                    { product.id ?
                        `Edit ${product.name}` : 'Add New Product'
                    }
                </h3>
                
                <form id='update-form-body' onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name: </label>
                        <input type='text' name='name' className='form-control' onChange={(e) => this.onChange(e)} value={name} />
                    </div>

                    <div className='form-group'>    
                        <label htmlFor='category'>Category: </label>
                        <input type='text' name='category' className='form-control' onChange={(e) => this.onChange(e)} value={category} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='price'>Price: </label>
                        <input type='number' name='price' className='form-control' onChange={(e) => this.onChange(e)} value={price} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='description'>Decription: </label>
                        <textarea className='input-description' name='description' className='form-control' onChange={(e) => this.onChange(e)} value={description} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='ImgUrl'>Image URL: </label>
                        <input type='text' name='ImgUrl' className='form-control' onChange={(e) => this.onChange(e)} value={ImgUrl} />
                    </div>

                    <div id='productForm-buttons' className='row justify-content-center'>
                        <button type='submit' className='btn btn-primary'>{ product.id ? 'Update ' : 'Create ' }</button>

                        { !!product.id &&
                            <button type='button' className='btn btn-danger' onClick={() => this.handleDestroy()}>{`Delete`}</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ products }, ownProps) => {
    return {
        product: products.products.find(product => product.id === ownProps.match.params.id * 1) || {}
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product) => dispatch(createProduct(product)),
        editProduct: (product) => dispatch(updateProduct(product)),
        removeProduct: (id) => dispatch(deleteProduct(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);