import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'



function NewCollections() {

  const [newarrivals, setNewArrivals] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/newarrivals')
    .then((response) => response.json())
    .then((data) => setNewArrivals(data))
  }, [])

  return (
    <div className ='new-collections' id="new-arrivals" >
        <h1>New Arrivals</h1>
        <hr />
        <div className="collections">
            {newarrivals.map((item, i) => {
                return<Item key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                price={item.price} 
                scent={item.scent} />
            })}
        </div>
    </div>
  )
}

export default NewCollections