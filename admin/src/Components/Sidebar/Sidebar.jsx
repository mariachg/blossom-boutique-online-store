import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addProductIcon from '../../assets/plus.png'  //<a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by Freepik - Flaticon</a>
import listProductsIcon from '../../assets/bullet-list.png' //<a href="https://www.flaticon.com/free-icons/list" title="list icons">List icons created by Pixel perfect - Flaticon</a>

function Sidebar() {
    return (
        <div className='sidebar'>
            {/* Adding Products */}
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={addProductIcon} alt="" />
                    <p>Add Product</p>
                </div>
            </Link>

             {/*Listing All the Products */}
            <Link to={'/listproducts'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={listProductsIcon} alt="" />
                    <p>List Products</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar