import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchProduct } from '../store/products'
import { addOrder } from '../store/cart'

// Displays single product
class SingleProduct extends Component {
    componentDidMount () {
        // Fetch product data
        this.props.init(this.props.match.params.id);
    }

    render () {
        
        const { product, userId, addToCart } = this.props;
        //console.log(this.props);
        //this.props.product.id is the productId
        // Since render runs first, this allows componentDidMount to fetch data before trying to display
        // ** This will be replaced by a loading thunk in the future, to display a loading graphic while **
        // ** we are acquiring the data                                                                  **
        if (!product.name) {
            return null
        }
        
        return (
            <div>
                <ul id='single-product'>
                {/* window.location.origin covers the edge case of image pathing breaking for certain images */}
                <img className ='thumbnail' src={ `${ window.location.origin }/${ product.ImgUrl }` }/>
                    <div>  
                    <li> {product.name} </li>
                    <li> {product.price} </li>
                    <li> {product.category} </li>                   
                    { product.quantity === 0 ?
                    <li id='sold-out'>SOLD OUT</li> :
                    <div>
                        <li> In Stock: { product.quantity }</li>
                        <button onClick = { () => addToCart(userId, this.props.product.id)}>Add to Cart</button>
                    </div>
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ 
    product: state.products.selectedProduct ,
    userId: state.auth.id
})

const mapDispatchToProps = (dispatch) => {
    return {
        init: (id) => dispatch(fetchProduct(id)),
        addToCart: (userId, productId) => dispatch(addOrder(userId, productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
