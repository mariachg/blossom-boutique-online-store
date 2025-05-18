import React, { useContext, useState, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

import sakuraIcon from '../Assets/sakuraIcon.png';
import cartIcon from '../Assets/cartIcon.png';
import { ShopContext } from '../../Context/ShopContext';
import menuIconNavbar from '../Assets/hamburger.png' /*<a href="https://www.flaticon.com/free-icons/hamburger" title="hamburger icons">Hamburger icons created by sonnycandra - Flaticon</a> */


function Navbar() {

    const [menu, setMenu] = useState("home")
    const { getTotalCartItems } = useContext(ShopContext)
    const menuRef = useRef()

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')


    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={sakuraIcon} alt=""></img>
                <p>Blossom Boutique </p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={menuIconNavbar} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("home") }} ><Link style={{ textDecoration: 'none' }} to='/'>Home</Link>{menu === "home" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("clothes") }}><Link style={{ textDecoration: 'none' }} to='/clothes'>Clothes</Link>{menu === "clothes" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("swimwear") }}><Link style={{ textDecoration: 'none' }} to='/swimwear'>Swimwear</Link>{menu === "swimwear" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("fragrances") }}><Link style={{ textDecoration: 'none' }} to='/fragrances'>Fragrances</Link>{menu === "fragrances" ? <hr /> : <></>} </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                    ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                    : <Link to='/login'> <button> Login </button></Link>}

                <Link to='/cart'><img src={cartIcon} alt="Cart" /></Link>
                <div className="name-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar