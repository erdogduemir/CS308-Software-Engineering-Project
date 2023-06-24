import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import '../constants/Navbar.css';
import '../constants/Footer.css';
import Navbar from './Navbar'
import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import '../constants/StarRating.css';
import '../constants/shoppingcard.css';
import { CartContext } from '../constants/CartContext';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer>{`Copyright © CS308 Team 9 ${year}`}</footer>;
};

export default function ShoppingCartPage() {

  const stars = [...Array(5).fill(faStar)];
  const cart = useContext(CartContext)

  return (
    <div className="containerNavbarPage">
      <div>
        <Navbar />
        <div className='products'>
          <h1 style={{ paddingRight: "75%" }}>Shopping Cart</h1>
          <Link className='view-or-edit'
            style={{ backgroundColor: 'transparent' }} to="/paymentpage">
            Confirm your cart
            <FontAwesomeIcon style={{ 'scale': '0.8' }} icon={faArrowRight}></FontAwesomeIcon>
          </Link>
          {cart.globalCart.map((product) => (
            <div
              key={product.pid}
              className='product-button'
            >
              <img src={product.pimage} alt={product.pname} />
              <div style={{ flex: 1 }}>
                <h3>{product.pname}</h3>
                <p>Model: {product.pmodel}</p>
                <span>${product.pprice}</span>
                <div style={{ padding: '8px' }}>
                  {stars.map((star, i) => {
                    const starColor = i + 1 <= product.prating ? "#FFD700" : "#CCCCCC"
                    return <FontAwesomeIcon icon={faStar} style={{ color: starColor, scale: '1.2' }} key={i}></FontAwesomeIcon>
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}