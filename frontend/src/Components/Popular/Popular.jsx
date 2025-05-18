import React, {useEffect, useState} from 'react'
import './Popular.css'
import Item from '../Item/Item.jsx'


function Popular() {

const[topPicksProducts, setTopPicks] = useState([])
useEffect(()=>{
    fetch('http://localhost:4000/toppicks')
    .then((response) => response.json())
    .then((data) => setTopPicks(data))
}, [])

    return (
        <div className='popular'>
            <h1>Top Picks</h1>
            <hr />
            <div className="popular-items">
                {topPicksProducts.map((item, i) => {
                    return <Item 
                    key={i} 
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

export default Popular