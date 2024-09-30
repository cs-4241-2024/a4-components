import React, { useState, useEffect } from 'react';

const Product = ({ product, releaseYear, releaseCost, currentCost }) => (
  <tr>
    <td>{product}</td>
    <td>{releaseYear}</td>
    <td>{releaseCost}</td>
    <td>{currentCost}</td>
  </tr>
);

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ product: '', releaseYear: '', releaseCost: '' });
  const [productToDelete, setProductToDelete] = useState('');

  useEffect(() => {
    fetch('/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddProduct = () => {
    fetch('/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  const handleDeleteProduct = () => {
    fetch('/products/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: productToDelete }),
    })
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  return (
    <div>
      <h1>Inflation Over Time</h1>
      <header>
        Enter the name of a product, its year of release, and how much it cost when it was released.
      </header>

      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product"
          value={newProduct.product}
          onChange={e => setNewProduct({ ...newProduct, product: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year of Release"
          value={newProduct.releaseYear}
          onChange={e => setNewProduct({ ...newProduct, releaseYear: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cost at Release"
          value={newProduct.releaseCost}
          onChange={e => setNewProduct({ ...newProduct, releaseCost: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Year of Release</th>
            <th>Price at Release</th>
            <th>Projected Price Today</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Product key={index} {...product} />
          ))}
        </tbody>
      </table>

      <div>
        <h2>Delete Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productToDelete}
          onChange={e => setProductToDelete(e.target.value)}
        />
        <button onClick={handleDeleteProduct}>Delete Product</button>
      </div>

      <footer>
        * Using an average inflation rate of 3.28%.
      </footer>
    </div>
  );
};

export default App;
