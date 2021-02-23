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
            <div className='container justify-content-center'>
                <div className='row justify-content-center'>
                    <div id='all-products-card' className='card text-center justify-content-center text-white bg-dark mb-3' style={{ width: 275 + 'px' }}>
                        {/* window.location.origin covers the edge case of image pathing breaking for certain images */}
                        <img className='card-image-top bg-white' src={ `${ window.location.origin }/${ product.ImgUrl }` }/> 
                        <div id='all-products-card-product-name' className='card-body'> 
                            <h3 className='card-text'>{product.name}</h3>
                        </div>
                        <hr></hr>
                        <div className='card-body'>
                            <h5 className='card-text'>{'$' + product.price}</h5>
                        </div>
                        <hr></hr>
                        <div className='card-body'>
                            <h5 className='card-text'>{product.category}</h5>
                        </div>     
                        <hr></hr>            
                        { product.quantity === 0 ?
                        <div className='card-body'>
                            <h3 className='card-text text-danger'>SOLD OUT</h3>
                        </div> :
                        <div className='card-body'>
                            <h5 className='card-text'> In Stock: { product.quantity }</h5>
                            <button className='btn btn-primary' onClick = { () => addToCart(userId, this.props.product.id)}>Add to Cart</button>
                        </div>
                        }
                    </div>
                </div>
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
