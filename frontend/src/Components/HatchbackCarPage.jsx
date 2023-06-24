import React, { useState, useEffect, useContext } from 'react'
import { FaStar } from "react-icons/fa"
import '../App.css'
import '../constants/Footer.css'
import '../constants/Navbar.css'
import '../constants/StarRating.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { CATEGORIES_API_URL, PRODUCTS_API_URL } from '../constants';
import { CartContext } from '../constants/CartContext';

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer>{`Copyright © CS308 Team 9 ${year}`}</footer>;
};

function ProductTitle() {
  return (
    <div class="containerTitle">
      <title>SUV Cars</title>
    </div>
  );

};

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [sumRatings, setSumRatings] = useState(0);

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
    setTotalRatings(totalRatings + 1);
    setSumRatings(sumRatings + ratingValue);
  };

  const averageRating = totalRatings === 0 ? 0 : sumRatings / totalRatings;

  return (
    <div className="star-rating">

      <div className="stars">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRatingClick(ratingValue)}
              />
              <FaStar
                className="star"
                color={
                  ratingValue <= (hover || rating)
                    ? "#ffc107"
                    : averageRating >= ratingValue
                      ? "#ffd700"
                      : "#e4e5e9"
                }
                size={20}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      {rating && (
        <div className="average-rating">

          <p>The average rating is {averageRating.toFixed(1)} stars.</p>
        </div>
      )}
    </div>
  );
};

const Products = () => {
  const [rating, setRating] = useState(0);

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const stars = [...Array(5).fill(faStar)];
  const cart = useContext(CartContext)
  const navigate = useNavigate()

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

  const addToCart = (product, e) => {
    e.stopPropagation()
    cart.updateCart(product)
    console.log("cart below:")
    console.log(cart.globalCart)
  };

  const ascendingPopularity = (products) => {
    setProducts([...products.sort((a, b) => {
      return b.ppopularity - a.ppopularity
    })])
  }

  const descendingPopularity = (products) => {
    setProducts([...products.sort((a, b) => {
      return a.ppopularity - b.ppopularity
    })])
  }

  const ascendingPrice = (products) => {
    setProducts([...products.sort((a, b) => {
      return b.pprice - a.pprice
    })])
  }

  const descendingPrice = (products) => {
    setProducts([...products.sort((a, b) => {
      return a.pprice - b.pprice
    })])
  }

  const incrementPopularity = (product) => {
    axios.put(PRODUCTS_API_URL + product.pk + "/",
      {
        'pk': product.pk,
        'pid': product.pid,
        'pname': product.pname,
        'pmodel': product.pmodel,
        'pnumber': product.pnumber,
        'pdescription': product.pdescription,
        'pstock': product.pstock,
        'pprice': product.pprice,
        'pwarranty': product.pwarranty,
        'pdistinfo': product.pdistinfo,
        'pcategory': product.pcategory,
        'ppopularity': product.ppopularity + 1,
        'psales_discount': product.psales_discount
      }
    )
  }

  return (
    <div className='products'>
      <button className='sort-button' onClick={() => ascendingPopularity(products)}>
        <span>
          Popularity &nbsp;
          <FontAwesomeIcon icon={faArrowUp} />
        </span>
      </button>
      <button className='sort-button' onClick={() => descendingPopularity(products)}>
        <span>
          Popularity &nbsp;
          <FontAwesomeIcon icon={faArrowDown} />
        </span>
      </button>
      <button className='sort-button' onClick={() => ascendingPrice(products)}>
        <span>
          Price &nbsp;
          <FontAwesomeIcon icon={faArrowUp} />
        </span>
      </button>
      <button className='sort-button' onClick={() => descendingPrice(products)}>
        <span>
          Price &nbsp;
          <FontAwesomeIcon icon={faArrowDown} />
        </span>
      </button>
      {products.filter((product) => product.pcategory === 3).map((product) => (
        <button
          key={product.pid}
          className='product-button'
          onClick={() => {
            incrementPopularity(product);
            navigate("/" +
              categories.filter(item => item.category_id == product.pcategory)[0].category_name.toLowerCase()
              + "carpage/" + product.pk + "-" + product.pname)
          }}

        >
          <img src={product.pimage} alt={product.pname} />
          <div style={{ flex: 1 }}>
            <h3>{product.pname}</h3>
            <p>Model: {product.pmodel}</p>
            {product.psales_discount > 0
              ? <span>${product.pprice * (1 - product.psales_discount/100)} &nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{color:'#CCCCCC', textDecoration: 'line-through'}}>${product.pprice}</span>
              </span>
              : <span>${product.pprice}</span>
            }
            <div style={{ padding: '8px' }}>
              {stars.map((star, i) => {
                const starColor = i + 1 <= product.prating ? "#FFD700" : "#CCCCCC"
                return <FontAwesomeIcon icon={faStar} style={{ color: starColor, scale: '1.2' }} key={i}></FontAwesomeIcon>
              })}
            </div>
          </div>
          <div className="button-container">
            <p>Current stock: {product.pstock}</p>
            <button
              className='add-to-cart'
              disabled={product.pstock <= 0 || cart.globalCart.filter(item => item.pid == product.pid).length === product.pstock}
              onClick={(e) => addToCart(product, e)}
            >
              Add to Cart
            </button>
          </div>
        </button>
      ))}
    </div>
  );
};

export default function SuvCarPage() {

  return (

    <div className="containerNavbarPage">
      <div>
        <Navbar />
        <ProductTitle />
        <Products />
        <Footer />
      </div>
    </div>

  )
}