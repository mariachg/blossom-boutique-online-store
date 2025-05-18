import React from 'react'
import './Hero.css'
import arrow from '../Assets/arrow.png'
import heroPerfumeGirl from '../Assets/heroGirlPerf.jpg'

function Hero() {

    const scrollToNewArrivals = () => {
        const section = document.getElementById("new-arrivals")
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className='hero'>
            <div className="hero-left">
                <p> Spring </p>
                <p>Collections</p>
                <div className="hero-latest-btn" onClick={scrollToNewArrivals}>
                    <div> New arrivals </div>
                    <img src={arrow} alt="Arrow" />
                </div>
            </div>
            <div className="hero-right">
                <img src={heroPerfumeGirl} alt="Hero" />
            </div>
        </div>
    )
}

export default Hero