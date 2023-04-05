import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


const Cart = ({cart,  handleClearCart, children}) => {
    // const cart = props.cart //Option-1
    // const{cart} =props;   //Option-2

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart){
        if(product.quantity === 0){
            product.quantity = 1;
        }
        // product.quantity = product.quantity || 1; 

        totalPrice =totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }

       const totalTax = totalPrice * 7 / 100;
       const grandTotal = totalPrice + totalShipping + totalTax



    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity} </p>
            <p>Total Price:{totalPrice} </p>
            <p>Total Shippin:{totalShipping}</p>
            <p>Tax:{totalTax.toFixed(2)} </p>
            <h6>Grand Total:${grandTotal.toFixed(2)} </h6>
            <button onClick={handleClearCart} className='clear-btn'>
            <span>Clear</span>
            <FontAwesomeIcon className='' icon={faTrashAlt} />
            </button>
            {
                children
            }
        </div>
    );
};

export default Cart;