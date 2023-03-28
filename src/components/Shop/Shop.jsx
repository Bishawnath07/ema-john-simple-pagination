import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect( () =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);

    useEffect(()=>{
        console.log(products)
        const storedCart = getShoppingCart();
        const saveCart =[];
        // step-1:get id
        for(const id in storedCart){
            //step-2: get the product from state by using id
            const addedProduct = products.find(product => product.id === id)
            //step-3 : get quantity procuct 
            if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            //step-4: add the added Product to the saved cart
            saveCart.push(addedProduct);
        }
      
        }
        //step-5: set the cart
        
        setCart(saveCart);

    }, [products])

    const handleAddTocart = (product) =>{
        const newCart =[...cart, product]
        setCart(newCart)
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product =><Product
                    key={product.id}
                    product = {product}
                    handleAddTocart = {handleAddTocart}
                    >
                    </Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart ={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;