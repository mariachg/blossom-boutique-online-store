import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

function Item(props) {
  return (
    <div className="item">
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={props.image} alt="" /> </Link> 
        <p> {props.name} </p>
        <div className="item-prices">
            ${props.price.toFixed(2)} 
        </div>
    </div>
  )
}

export default Item