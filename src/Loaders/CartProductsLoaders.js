import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    //if cart data is in database , you have to use async await
    const storedCart = getShoppingCart();
    const saveCart =[];

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id );
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct)
        }
    }
    //if you need to send two things (return),
    // return [products, saveCart]
    // another option 
    // return { product , saveCart}
    
    return saveCart;
}

export default cartProductsLoader;