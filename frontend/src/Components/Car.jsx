import { useState, useEffect, useContext } from 'react'
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom'
import '../constants/Navbar.css';
import '../constants/Footer.css';
import Navbar from './Navbar'
import React from 'react';
import { FaStar } from "react-icons/fa";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../constants/StarRating.css';
import axios from 'axios';
import { COMMENTS_API_URL, CUSTOMERS_API_URL, PRODUCTS_API_URL, RATINGS_API_URL, AUTH_USERS_ME } from '../constants';
import { CartContext } from '../constants/CartContext';
import { Stack } from '@mui/material';

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer>{`Copyright © CS308 Team 9 ${year}`}</footer>;
};

const Products = () => {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState([]);
  const [product, setProduct] = useState([])
  const [customer, setCustomer] = useState([])
  const [userInfo, setUserInfo] = useState()
  const [wishList, setWishList] = useState([])
  const [pressedAdd, setPressedAdd] = useState("Add to Wish List")
  const [pressedColor, setPressedColor] = useState("#2f66d6")

  const { pk_and_pname } = useParams()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  }

  axios.defaults.headers.put['Authorization'] = `JWT ${localStorage.getItem('access')}`;

  useEffect(() => {
    const pk_of_product = pk_and_pname.substring(0, pk_and_pname.indexOf('-'))
    axios.get(PRODUCTS_API_URL + pk_of_product + "/").then((response) => {
      setProduct(response.data)
      console.log("product below:")
      console.log(response.data)
    })
    axios.get(COMMENTS_API_URL).then((response) => {
      setComment(response.data)
      console.log("comments below:")
      console.log(response.data)
    })
    axios.get(RATINGS_API_URL).then((response) => {
      setRating(response.data)
    })
    axios.get(CUSTOMERS_API_URL).then((response) => {
      setCustomer(response.data)
      console.log("customers below:")
      console.log(response.data)
    })
    axios.get(AUTH_USERS_ME, config).then((response) => {
      setUserInfo(response.data)
      console.log(response.data)
      setWishList(response.data.wishList.split(',').map(Number))
      console.log('wishlist below:')
      console.log(response.data.wishList.split(',').map(Number))
    })
    console.log("cart below:")
    console.log(cart.globalCart)
  }, [])

  const stars = [...Array(5).fill(faStar)];

  const [quantity, setQuantity] = useState(1);
  const [inStock, setInStock] = useState(10);

  const cart = useContext(CartContext)

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= inStock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = (item) => {
    cart.updateCart(item)
    console.log("cart below:")
    console.log(cart.globalCart)

    // Reduce the number of items in stock by the selected quantity
    setInStock(inStock - quantity);
  };

  const handleAddToWishList = (item) => {
    axios.put(AUTH_USERS_ME, {
      'email': userInfo.email,
      'home_address': userInfo.home_address,
      'name': userInfo.name,
      'pk': userInfo.pk,
      'surname': userInfo.surname,
      'tax_id': userInfo.tax_id,
      'wishList': userInfo.wishList === "" ? product.pk : userInfo.wishList + "," + product.pk,
      'notificationList': userInfo.notificationList,
      'is_staff': userInfo.is_staff,
      'is_superuser': userInfo.is_superuser
    })
    setPressedAdd("Added to Wish List")
    setPressedColor("#888888")
  }

  return (
    <div >
      <div style={{ width: "100%" }}>
        <div
          key={product.pid}
          className='product-container'
        >
          <img
            src={product.pimage}
            alt={product.pname}
            style={{
              width: "400px",
              objectFit: "cover",
              borderRadius: "5px",
              marginLeft: "6vw",
            }}
          />
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {product.pname}
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
              Model: {product.pmodel} &nbsp;&nbsp; Doors: {product.pnumber}
            </p>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
              {product.pdescription}
            </p>
            {product.psales_discount > 0
                    ? <span className="product-price">
                        ${product.pprice * (1 - product.psales_discount / 100)} &nbsp;&nbsp;&nbsp;
                        <span style={{color:'#CCCCCC', textDecoration: 'line-through'}}>${product.pprice}</span>
                    </span>
                    : <span className="product-price">${product.pprice}</span>
                }
            <div style={{ padding: '8px' }}>
              <span style={{ color: 'black' }}>
                Rating:&nbsp;&nbsp;
              </span>
              {stars.map((star, i) => {
                const starColor = i + 1 <= product.prating ? "#FFD700" : "#CCCCCC"
                return <FontAwesomeIcon icon={faStar} style={{ color: starColor }} key={i}></FontAwesomeIcon>
              })}
            </div>
          </div>
          <div style={{ paddingTop: "50px" }}>
            <Stack direction="column" spacing='20px' paddingRight='40px'>
            {product.pstock > 0
              ? <p style={{ fontSize: '16px', margin: '0 0 0 0' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {"In stock: " + product.pstock}
              </p>
              : <p className='product-price' style={{ fontSize: '16px', margin: '0 0 0 0' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Out of stock!
              </p>
            }
            <Stack direction="row">
            <label htmlFor="quantity" style={{ fontSize: '16px', margin: '0 10px 0 0' }}>Quantity:</label>
            <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} style={{
              fontSize: '16px',
              width: '50px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              margin: '0 10px 0 0',
              backgroundColor: 'white',
              color: 'black'
            }} />
            <button
              className='add-to-cart'
              disabled={quantity > product.pstock || cart.globalCart.filter(item => item.pid == product.pid).length === product.pstock}
              onClick={() => handleAddToCart(product)}
              style={{color:'white'}}
            >
              Add to Cart
            </button>
            </Stack>
            <button
              style={{color: wishList.indexOf(product.pk) == -1 ? pressedColor : '#888888', backgroundColor:'transparent'}}
              onClick={() => handleAddToWishList(product)}
              disabled={wishList.indexOf(product.pk) > -1}
            >
              {wishList.indexOf(product.pk) == -1 ? pressedAdd : 'Added to Wish List'}
            </button>
            </Stack>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div className='product-container'>
          <p><span style={{ fontWeight: 'bold' }}>Warranty:</span> {product.pwarranty}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <p><span style={{ fontWeight: 'bold' }}>Distributor:</span> {product.pdistinfo}</p>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Stack direction='row' style={{ paddingLeft: '50px', marginBottom: '-20px' }}>
          <h2>Reviews</h2>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-around"
          className='product-button'
          style={{ width: '94.5vw' }}
        >
          <Stack
            direction="column"
            justifyContent="space-around"
            style={{ width: '94.5vw' }}
          >
            <h3>Comments</h3>
            {comment.length > 0
            ? comment.filter((com) => com.cproduct == product.pk).map((row) => (
              row.c_is_approved
                ? customer.filter((c) => c.pk == row.ccustomer).map((cust) => (
                  <p style={{fontWeight:'bold'}}>{cust.name + " " + cust.surname + ": "
                } <span style={{fontWeight: 'normal', color: 'black', fontSize:'16px'}}>{row.ctext}</span></p>
                ))
                : null
            ))
          : null
          }
          </Stack>
          <Stack
            direction="column"
            justifyContent="space-around"
            style={{ width: '94.5vw' }}
          >
            <h3>Ratings</h3>
            <p>
              {rating?.filter((rat) => rat.rproduct == product.pk).map((row) => (
                stars.map((star, i) => {
                  const starColor = i + 1 <= row.rstars ? "#FFD700" : "#CCCCCC"
                  return <FontAwesomeIcon icon={faStar} style={{ color: starColor }} key={i}></FontAwesomeIcon>
                })
              ))}
            </p>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default function Car() {
  return (
    <div className="containerNavbarPage">
      <div>
        <Navbar />
        <Products />
      </div>
    </div>
  )
} 