import React, { useState, useEffect, useContext } from 'react'
import '../App.css'
import '../constants/Footer.css'
import '../constants/Navbar.css'
import '../constants/StarRating.css'
import Navbar from './Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { AUTH_USERS_ME, PRODUCTS_API_URL } from '../constants';
import { CartContext } from '../constants/CartContext';

const Footer = () => {
    const year = new Date().getFullYear();
    return <footer>{`Copyright © CS308 Team 9 ${year}`}</footer>;
};

export default function WishList() {

    const [userInfo, setUserInfo] = useState()
    const [wishList, setWishList] = useState([])
    const [products, setProducts] = useState([])
    const cart = useContext(CartContext)
    const stars = [...Array(5).fill(faStar)];

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    useEffect(() => {
        axios.get(AUTH_USERS_ME, config).then((response) => {
            setUserInfo(response.data)
            console.log('customer below:')
            console.log(response.data)
            setWishList(response.data.wishList.split(',').map(Number))
            console.log("wish list below:")
            console.log(response.data.wishList.split(',').map(Number))
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
                <h1 style={{ paddingRight: "75%" }}>Wish List</h1>
            </div>
            {wishList[0] !== 0
                ? <div className='products'>
                    {products.filter((product) => wishList.includes(product.pk)).map((product) => (
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
                                <span>${product.pprice}</span>
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
                : 
                <div>
                    &nbsp;
                    <h1>Your wish list seems empty, let's look for some products!</h1>
                </div>
            }
            <Footer />
        </div>
    )
}