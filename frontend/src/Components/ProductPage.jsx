import React, { useState } from 'react';
import Navbar from './Navbar'
import '../constants/Navbar.css';




const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [inStock, setInStock] = useState(10);
  const [cart, setCart] = useState([]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= inStock) {
      setQuantity(value);
    } else if (value > inStock) {
      setQuantity(inStock);
    } else {
      setQuantity(1);
    }
  };


  const handleAddToCart = () => {
    // Add item to cart with the selected quantity
    if (inStock > 0) {
      const item = {
        name: "Mercedes-Benz G-Class G500",
        price: 100000,
        quantity: quantity
      }
      setCart([...cart, item]);

      // Reduce the number of items in stock by the selected quantity
      setInStock(inStock - quantity);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      border: '1px solid #ddd'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Mercedes-Benz G-Class G500</h1>
      <img src="https://cdn.wheel-size.com/automobile/body/mercedes-g-class-2018-2023-1653972031.9369192.jpg" alt="Product Image" style={{ display: 'block', maxWidth: '100%', margin: '0 0 20px 0' }} />
      <p style={{ fontSize: '18px', margin: '0 0 10px 0' }}>$100,000</p>
      <p style={{ fontSize: '16px', margin: '0 0 10px 0' }}>In Stock: {inStock}</p>
      <label htmlFor="quantity" style={{ fontSize: '16px', margin: '0 10px 0 0' }}>Quantity:</label>
      <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} style={{
        fontSize: '16px',
        width: '50px',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '3px',
        margin: '0 10px 0 0'
      }} />
      <button onClick={handleAddToCart} style={{
        fontSize: '16px',
        padding: '10px 20px',
        backgroundColor: '#f60',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: inStock > 0 ? 'pointer' : 'not-allowed', // Disable the button if there is no stock available
        opacity: inStock > 0 ? 1 : 0.5 // Reduce the opacity of the button if there is no stock available
      }} disabled={inStock === 0}>Add to Cart</button>
      <p style={{ fontSize: '16px', margin: '20px 0' }}>Product Description:</p>
      <p style={{ fontSize: '14px', margin: '0 0 20px 0' }}>The Mercedes-Benz G-Class, sometimes colloquially called the G-Wagen (as an abbreviation of Geländewagen) is a four-wheel drive automobile manufactured by Magna Steyr in Austria and sold by Mercedes-Benz. Originally developed as a military off-roader, later more luxurious models were added to the line. In certain markets, it was sold under the Puch name as Puch G until 2000. The G-Wagen is characterised by its boxy styling and body-on-frame construction. It uses three fully locking differentials, one of the few passenger car vehicles to have such a feature. Despite the introduction of an intended replacement, the unibody SUV Mercedes-Benz GL-Class in 2006, the G-Class is still in production and is one of the longest-produced vehicles in Daimler's history, with a span of 43 years. Only the Unimog surpasses it. In 2018, Mercedes-Benz launched a technically new second generation, still with only minor design changes.</p>
    </div>
  );
}


export default ProductPage
