import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    const {img, name, seller, ratings, quantity, price} =  props.product;
    const handleAddTocart = props.handleAddTocart;

    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
            <h3 className='product-name'>{name}</h3>
            <p>Price: ${price}</p>
            <p>Manufacturer: {seller}</p>
            <p>Rating: {ratings} starts</p>
            </div>
            <button onClick={()=>handleAddTocart(props.product)} className='btn-cart'>
                Add to Cart
                <FontAwesomeIcon icon={faShoppingCart} />
                </button>
        </div>
    );
};
import './Product.css'
export default Product;