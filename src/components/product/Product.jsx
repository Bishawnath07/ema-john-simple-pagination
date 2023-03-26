import React from 'react';
import './Product.css'
const Product = (props) => {
    const {img, name, seller, ratings, quantity, price} =  props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
            <h3 className='product-name'>{name}</h3>
            <p>Price: ${price}</p>
            <p>Manufacturer: {seller}</p>
            <p>Rating: {ratings} starts</p>
            </div>
            <button className='btn-cart'>Add to Cart</button>
        </div>
    );
};
import './Product.css'
export default Product;