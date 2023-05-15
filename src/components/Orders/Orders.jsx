import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import Product from '../product/Product';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const saveCart = useLoaderData();
    const [cart, setCart] = useState(saveCart);
    
    const handleRemoveFromCart = (id) =>{
        const remaing = cart.filter(product => product._id !== id)
        setCart(remaing);
        removeFromDb(id);
    }

    const handleClearCart = ()=>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product =><ReviewItem
                    key={product._id}
                    product={product}
                    handleRemoveFromCart = {handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
               <Cart 
                cart ={cart} 
                handleClearCart = {handleClearCart}
                 >
                    <Link to= '/cheakout'>
                        <button className='btn-proceed'>Proceed Cheakout</button>
                    </Link>
                </Cart>
            </div>    
        </div>
    );
};

export default Orders;