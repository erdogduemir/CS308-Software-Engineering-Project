import React from 'react';

const ListPage = () => {
  const products = [
    { id: 1, stock: 10,  name: 'Mercedes-Benz G-Class G500', price: "100,000", imagelink: "https://cdn.wheel-size.com/automobile/body/mercedes-g-class-2018-2023-1653972031.9369192.jpg"},
    { id: 2, stock: 5, name: 'Ferrari La Ferrari', price: "500,000", imagelink: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg/1200px-LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg"},
  ];

  return (
    <div>
      <h1>Products</h1>
      <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ backgroundColor: '#f2f2f2', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', margin: '10px', padding: '20px', width: '300px' }}>
            <img src={product.imagelink} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
            <h2 style={{ marginTop: '1rem' }}>{product.name}</h2>
            <p style={{ marginBottom: 0 }}>Stock: {product.stock}</p>
            <p style={{ marginBottom: '0.5rem' }}>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
