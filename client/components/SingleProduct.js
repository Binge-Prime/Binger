import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchProduct } from '../store/products'


class SingleProduct extends Component {
    async componentDidMount () {
         //console.log('THE PROPS', this.props)
         const productId = this.props.match.params.id
         await this.props.getProduct(productId);
        
    }
    render () {
        const { selectedProduct } = this.props.products;
        //  console.log(selectedProduct);
        return (
            <div>
                <ul id='single-product'>
                <img className ='thumbnail' src={ selectedProduct.ImgUrl }/>
                    <li> {selectedProduct.name} </li>
                    <li> {selectedProduct.price} </li>
                    <li> {selectedProduct.category} </li>
                   <button onClick = { () => console.log('item added to cart')} >  add to Cart</button>
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state
}



const mapDispatchToProps = (dispatch) => {
    return {
        getProduct: (productId) => dispatch(fetchProduct(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
