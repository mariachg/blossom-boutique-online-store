import React, { useEffect, useState } from 'react'
import './NewArrivals.css'
import Item from '../Item/Item'

function NewArrivals() {

  const [newarrivals, setNewArrivals] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/newarrivals')
    .then((response) => response.json())
    .then((data) => setNewArrivals(data))
  }, [])

  return (
    <div className ='new-arrivals' id="new-arrivals" >
        <h1>New Arrivals</h1>
        <hr />
        <div className="arrivals">
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

export default NewArrivals