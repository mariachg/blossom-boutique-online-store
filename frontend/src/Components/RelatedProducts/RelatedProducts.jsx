import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import all_products from '../Assets/all_products'

function RelatedProducts() {

  return (
    <div className='relatedproducts'>
        <h1>Similar Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {all_products.slice(0,4).map((item, i) => {
                return <Item key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                price={item.price} 
                scent={item.scent}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts