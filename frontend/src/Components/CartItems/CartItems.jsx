import React, { useState, useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import removeIcon from '../Assets/close.png' /*<a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by Pixel perfect - Flaticon</a> */
import axios from 'axios'

function CartItems() {
    const { getTotalCartAmount, all_products, cartItems, removeFromCart, setCartItems } = useContext(ShopContext)
    const [showModal, setShowModal] = useState(false)
    const checkout = async () => {
        try {
             await axios.post(
                'http://localhost:4000/checkout',
                {},
                {
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                }
            )

            //Resetting the cart and Show popup
            setShowModal(true)

            let emptyCart = {}
            for (let i = 0; i <= 300; i++) {
                emptyCart[i] = 0
            }
            setCartItems(emptyCart)
        } catch (error) {
            console.error("Chackout failed", error)
            alert("Checkout failed. Try again. ")
        }
    }

    return (
        <>
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
             {all_products.map((e) => {
                if (cartItems[e.id] > 0) { 
                    return <div key={e.id}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>${e.price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>${e.price * cartItems[e.id]}</p>
                            <img src={removeIcon} onClick={() => { removeFromCart(e.id) }} alt="" className='cartitems-remove-icon' />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })} 
            <div className="cartitems-down">

            </div>
            <div className="cartitems-total">
                <h1>Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount().toFixed(2)}</p>  {/* forcing the prices to have a maximum of 2 decimal points  */}
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount().toFixed(2)}</h3>
                    </div>
                    <button onClick={checkout}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    {
        showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <h2>Checkout was Successfully Completed</h2>
                    <p>Thank you for your purchase!</p>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
        )
    }
    </>
  )
}

export default CartItems