import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchProduct } from '../store/products'

// Displays single product
class SingleProduct extends Component {
    componentDidMount () {
        // Fetch product data
        this.props.init(this.props.match.params.id);
    }

    render () {
        const { product } = this.props;

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
                    <li> {product.name} </li>
                    <li> {product.price} </li>
                    <li> {product.category} </li>
                    {/* console.log to be replaced with cart thunk */}
                   <button onClick = { () => console.log('item added to cart')} >  add to Cart</button>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ product: state.products.selectedProduct })

const mapDispatchToProps = (dispatch) => {
    return {
        init: (id) => dispatch(fetchProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
