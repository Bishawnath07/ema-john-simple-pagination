import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [cart, setCart] = useState([])
    const {totalProducts} = useLoaderData();
    console.log(totalProducts)
    
    
    const totalPages = Math.ceil(totalProducts / itemsPerPage); 
    
    const pageNumbers = [ ...Array(totalPages).keys()];
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);

            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                const savedCart = [];
                // step 1: get id of the addedProduct
                for (const id in storedCart) {
                    // step 2: get product from products state by using id
                    const addedProduct = cartProducts.find(product => product._id === id)
                    if (addedProduct) {
                        // step 3: add quantity
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        // step 4: add the added product to the saved cart
                        savedCart.push(addedProduct);
                    }
                    // console.log('added Product', addedProduct)
                }
                // step 5: set the cart
                setCart(savedCart);
            })


    }, [])

    const handleAddTocart = (product) =>{
        const newCart =[...cart, product]
        setCart(newCart)
        addToDb(product._id)
    }

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    const options = [5, 10, 15, 20];
    function handleSelectChange (event){
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }


    return (
        <>
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product =><Product
                    key={product._id}
                    product = {product}
                    handleAddTocart = {handleAddTocart}
                    >
                    </Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart ={cart}
               handleClearCart ={handleClearCart}>
                <Link to = '/order'>
                    <button className='btn-proceed'>Review Order</button>
                </Link>
               </Cart>
            </div>
        </div>
         {/* pagination */}
         <div className="pagination">
                <p>current Page: {currentPage} and items per page: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;