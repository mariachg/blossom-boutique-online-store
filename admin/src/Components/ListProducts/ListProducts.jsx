import React, { useEffect, useState } from 'react'
import './ListProducts.css'
import removeIcon from '../../assets/close.png'

function ListProducts() {

  //fetching data from the API
  const [allproducts, setAllProducts] = useState([])

  //fetching data from the API and save it in the state variable
  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) })
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  //function for removing products
  const removeProduct = async (id)=>{
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({id:id})
    })
    await fetchInfo()
  }

  return (
    <div className='list-products'>
      <h1>List of All Products</h1>
      <div className="listproducts-header">
        <p>Product</p>
        <p>Name</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <><div key={(index)} className="listproducts-row">
            <img src={product.image} alt="" className="listproducts-productIcon" />
          <p>{product.name}</p>
          <p>${product.price}</p>
          <p>{product.category}</p>
          <img onClick={() => {removeProduct(product.id)}} className='listproducts-removeIcon' src={removeIcon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProducts