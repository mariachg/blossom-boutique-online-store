import React from 'react'
import './Breadcrumb.css'
import arrow from '../Assets/arrow2.png'


function Breadcrumb(props) {
 const {product} = props
    return (
    <div className='breadcrumb'>
        HOME <img src={arrow} alt=""/> {product.category}  <img src={arrow} alt=""/> {product.name}
    </div>
  )
}

export default Breadcrumb