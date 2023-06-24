import React, { useContext, useState, useEffect } from "react";
import '../constants/Navbar.css'
import Navbar from './Navbar'
import '../constants/Footer.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CATEGORIES_API_URL, PRODUCTS_API_URL } from '../constants';
import { CartContext } from '../constants/CartContext';

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const cart = useContext(CartContext)

  const navigate = useNavigate()

  const Footer = () => {
    const year = new Date().getFullYear();
    return <footer>{`Copyright © CS308 Team 9 ${year}`}</footer>;
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

  const handleAddToCart = (item) => {
    cart.updateCart(item)
    console.log("cart below:")
    console.log(cart.globalCart)
  };

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Filter products based on search text
    const filteredProducts = products.filter(
      (product) =>
        product.pname.toLowerCase().includes(searchText.toLowerCase()) ||
        product.pdescription.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(filteredProducts);
  };

  return (
    <div className="containerNavbarPage">
      <div>
        <Navbar />
        <form onSubmit={handleSearchSubmit}>
          <input
            style={{
              width: "300px", height: "30px", marginTop: "20px",
              color: 'black', backgroundColor: 'white', borderRadius:'10px',
              paddingInline:'8px'
            }}
            type="text"
            value={searchText}
            onChange={handleSearchInputChange}
            placeholder="Search products by name or description..."
          />
          <button type="submit" className="view-or-edit" style={{backgroundColor:'transparent'}}>Search</button>
        </form>

        {searchResults.length > 0 ? (
          <div>
            <h2 style={{ fontSize: "20px" }}>Search Results</h2>
            <div>
              {searchResults.map((product) => (
                <div key={product.pid}>
                  <h3>{product.pname}</h3>
                  <img
                    src={product.pimage}
                    alt={product.pname}
                    style={{
                      width: "400px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                    onClick={() => 
                      navigate("/" +
                      categories.filter(item => item.category_id == product.pcategory)[0].category_name.toLowerCase()
                      + "carpage/" + product.pk + "-" + product.pname)}
                  />
                  <p>{product.pdescription}</p>
                  <p>${product.pprice}</p>
                  <button className='add-to-cart'
                    disabled={product.pstock <= 0 || cart.globalCart.filter(item => item.pid == product.pid).length === product.pstock}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <p style={{ fontSize: '12px' }}>Current stock: {product.pstock}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: "20px" }}>No Results Found</h2>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
