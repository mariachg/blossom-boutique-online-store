import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';

function ProductDisplay(props) {
    const { product } = props;
    const { addToCart } = useContext(ShopContext)
    const [selectedSize, setSelectedSize] = useState(null)

    if(!product) {
        return <div>Loading product ... </div>
    }
    // Conditionally render size options based on product category
    const renderSizeOptions = () => {
        let sizes = []

        if (product.category === 'clothes' || product.category === 'swimwear') {
            sizes = ['XS', 'S', 'M', 'L', 'XL']


        } else if (product.category === 'fragrances') {
            sizes = ['30ml', '50ml', '70ml', '100ml']
        } return sizes.map(size => (
            <div
                key={size}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
            >
                {size}
            </div>
        ))
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>

                <div className="productdisplay-price">${product.price}</div>
               

                <button onClick={() => {
                   
                    addToCart(product.id, selectedSize)
                }}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default ProductDisplay