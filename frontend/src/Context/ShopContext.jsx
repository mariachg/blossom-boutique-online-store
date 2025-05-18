import React, { createContext, useEffect, useState } from "react";




export const ShopContext = createContext(null);
const getDefaultCart = () => ({})
// const getDefaultCart = () => {
//     let cart = {};
//     for (let index = 0; index < 300 + 1; index++) {
//         cart[index] = 0;

//     }
//     return cart;
// }

const ShopContextProvider = (props) => {

    const [all_products, setAllProducts] = useState([])

    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAllProducts(data))

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }, 
                body: "",
              
            }).then((response) => response.json())
            .then((data) => setCartItems(data)) 
            
            
       
        }
    }, [])


    const addToCart = (itemId, size) => {
const key = size ? `${itemId}_${size}`: itemId

        setCartItems((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemid": itemId, size }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        } else {
            console.log("not logged in");
        }
    }
    
    const removeFromCart = (itemId, size) => {
        const key = size ? `${itemId}_${size}` : `${itemId}`
        setCartItems((prev) => ({ ...prev, [key]: (prev[key] || 1) - 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemid": itemId, size }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const key in cartItems) {
            const quantity = cartItems[key]
            if (quantity > 0) {
                const [idStr] = key.split('_')
                const id = parseInt(idStr)
                const itemInfo = all_products.find((product) => product.id === id)
                if (itemInfo) {
                    totalAmount += itemInfo.price * quantity
                }

            }
        }
        return totalAmount
    }

    const getTotalCartItems = () => {
        let totalItems = 0
        for (const key in cartItems) {
            if (cartItems[key] > 0) {
                totalItems += cartItems[key]
            }
        }
        return totalItems
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart, setCartItems };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;