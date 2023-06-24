import React, { useState, useEffect, useContext } from 'react';
import '../constants/Navbar.css';
import '../constants/Footer.css';
import '../constants/shoppingcard.css';
import Navbar from './Navbar'
import '../constants/Footer.css'
import axios from 'axios';
import { CATEGORIES_API_URL, PRODUCTS_API_URL } from '../constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../constants/CartContext';

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer>{`Copyright © CS308 Team 9 ${year}`}</footer>;
};

function ShoppingCartButton() {
  return (
    <Link className="cart-button" style={{borderRadius:'8px'}} to="/shoppingcartpage">Cart</Link>
  );
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate()

  const cart = useContext(CartContext)

  const addToCart = (product, e) => {
    e.stopPropagation()
    cart.updateCart(product)
    console.log("cart below:")
    console.log(cart.globalCart)
  };

  useEffect(() => {
    axios.get(CATEGORIES_API_URL).then((response) => {
      setCategories(response.data)
      console.log("categories below:")
      console.log(response.data)
    })
    axios.get(PRODUCTS_API_URL).then((response) => {
      setProducts(response.data)
      console.log("products below:")
      console.log(response.data)
    })
    console.log("cart below:")
    console.log(cart.globalCart)
  }, [])

  return (
    <div className="containerNavbarPage">
      <div>
        <Navbar />
        <h1 style={{ paddingRight: "75%" }}>Car Models</h1>
        <ShoppingCartButton />
        {categories.map((row) => (
          <div key={row.category_id}>
            <Link
              style={{ display: 'inline', borderBottom: '1px solid black', color: 'black' }}
              to={"/" + row.category_name.toLowerCase() + "carpage"}
            >
              <span style={{ fontWeight: 'bold' }}>{row.category_name}</span> &nbsp;
              <FontAwesomeIcon style={{ 'scale': '0.8' }} icon={faArrowRight} />
            </Link>
            <div className='product-container'>
              {products
                .filter((product) => product.pcategory === row.category_id)
                .map((p_row) => (
                  <div
                    style={{ 'paddingLeft': '80px', 'paddingRight': '80px' }}
                    key={p_row.pid}
                    onClick={() => navigate("/" + row.category_name.toLowerCase() + "carpage/" + p_row.pid + "-" + p_row.pname)}
                  >
                    <img style={{ 'height': '100px' }} src={p_row.pimage} alt={p_row.pname} />
                    <h3>{p_row.pname}</h3>
                    <p>${p_row.pprice}</p>
                    <button className='add-to-cart'
                    style={{color:'white'}}
                      disabled={p_row.pstock <= 0 || cart.globalCart.filter(item => item.pid == p_row.pid).length === p_row.pstock}
                      onClick={(e) => addToCart(p_row, e)}
                    >
                      Add to Cart
                    </button>
                    <p style={{ fontSize: '12px' }}>Current stock: {p_row.pstock}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
        <Footer />

      </div>
    </div>
  );
};

export default CategoriesPage;