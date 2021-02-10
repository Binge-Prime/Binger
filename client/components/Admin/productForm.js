import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct, addProduct, editProduct, deletedProduct } from '../store';

class productForm extends Component {
    constructor({ product }) {
        super();
        this.state = {
            name: product.id ? product.name : '',
            category: product.id ? product.category : '',
            quantity: product.id ? product.quantity : 0,
            price: product.id ? product.price : 0,
            description: product.id ? product.description : '',
            ImgUrl: product.id ? product.ImgUrl : '',
        }
        this.onChange = this.onChange.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.init('product id');
    }
    componentDidUpdate() {
        if (prevProps.product.id !== this.props.product.id) {
            this.setState({
                name: this.props.product.name,
                category: this.props.product.category,
                quantity: this.props.product.quantity,
                price: this.props.product.price,
                description: this.props.product.description,
                ImgUrl: this.props.product.ImgUrl,
            });
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleDestroy() {
        const { product } = this.props;
        this.props.deleteProduct(product.id);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { product } = this.props;
        if (product.id) {
            this.props.updateProduct({ ...this.state, id: this.props.campus.id });
        } else {
            this.props.createProduct({ ...this.state });
        }
    }
    render() {
        const { name, category, quantity, price, description, ImgUrl } = this.state;
        const { product } = this.props;
        return (
            <div id='productForm-shell'>
                <h2>
                    { product.id ?
                        `Edit ${product.name}` : 'Add New Product'
                    }
                </h2>
                
                <form id='productForm-body' onSubmit={(e) => this.handleSubmit(e)}>
                    <label for='name'>Name: </label>
                    <input type='text' name='name' onChange={(e) => this.onChange(e)} value={name} />
                    
                    <label for='category'>Category: </label>
                    <input type='text' name='category' onChange={(e) => this.onChange(e)} value={category} />

                    <label for='quantity'>Quantity: </label>
                    <input type='number' name='quantity' onChange={(e) => this.onChange(e)} value={quantity} />

                    <label for='price'>Price: </label>
                    <input type='number' name='price' onChange={(e) => this.onChange(e)} value={price} />

                    <label for='description'>Decription: </label>
                    <textarea className='input-description' name='description' onChange={(e) => this.onChange(e)} value={description} />

                    <label for='ImgUrl'>Image URL: </label>
                    <input type='url' name='ImgUrl' onChange={(e) => this.onChange(e)} value={ImgUrl} />

                    <div id='productForm-buttons'>
                        <input type='reset'></input>
                        <button type='submit' className='button-edit'>{product.id ? `Update` : `Create` `${name}`}</button>
                    </div>
                </form>

                { !!product.id &&
                    <button type='button' className='button-delete' onClick={() => this.handleDestroy()}>{`Delete ${product.name}`}</button>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ products }, ownProps) => {
    return {
        product: products.products.find(product => product.id === ownProps.match.params.id * 1) || {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: (id) => dispatch(fetchProduct(id)),
        addProduct: (product) => dispatch(addProduct(product)),
        editProduct: (product) => dispatch(editProduct(product)),
        deleteProduct: (id) => dispatch(deletedProduct(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(productForm);