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
        const { name, category, quantity, price, description } = this.state;
        const { product } = this.props;
        return (
            null
        );
    }
}

const mapStateToProps = ({ products }) => {
    return {
        products: products.products
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