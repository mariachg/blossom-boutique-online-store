import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/sakuraIcon.png' 
import adminPic from '../../assets/user.png' //<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Pixel perfect - Flaticon</a>
function Navbar() {
  return (
    <div className='navbar'>
        <div className="nav-logo">
    <img src={navlogo} alt="Logo" />
    <div className="nav-titles">
      <p className="brand-name">Blossom Boutique</p>
      <p className="admin-panel">Admin Panel</p>
    </div>
  </div>
  <img src={adminPic} alt="Admin" className="nav-profile" />
    </div>
  )
}

export default Navbar