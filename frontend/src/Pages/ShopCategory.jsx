import React, {useContext} from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item.jsx'

function ShopCategory(props) {
  const {all_products} = useContext(ShopContext)

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />

      <div className="shopcategory-sort">
      <select name="Sort" >
      <option value="default">Sort by</option>
        <option value="low-high">Price low to high</option>
        <option value="high-low">Price high to low</option>
      </select>
      </div>

      <div className="shopcategory-products">
        {all_products.map((item, i) =>{
          if (props.category === item.category) {
            return <Item key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            price={item.price} 
            scent={item.scent}/>
          }
          else{
            return null;
          }
        })}
      </div>
    </div>
  )
}

export default ShopCategory