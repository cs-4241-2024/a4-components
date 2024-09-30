import { useState } from 'react';
import Cart from './components/Cart';
import ContactForm from './components/ContactForm';
import "./App.css";
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import products from './data/products';
import OrdersTable from './components/OrderTable';

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = (cartItems) => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    setTotal(newTotal);
  };

  // Handle adding an item to the cart
  const handleAddToCart = (productName, productPrice, quantity) => {
    const existingItem = cart.find(item => item.productName === productName);
    if (existingItem) {
      updateCart(productName, existingItem.quantity + quantity);  // Update quantity if the product is already in the cart
    } else {
      const newCartItem = { productName, productPrice, quantity };
      const newCart = [...cart, newCartItem];
      setCart(newCart);
      calculateTotal(newCart);
    }
  };

  // Update the quantity of a specific product in the cart
  const updateCart = (productName, quantity) => {
    if (quantity <= 0) {
      removeItem(productName);  // Remove item if quantity is set to 0 or below
      return;
    }
    const updatedCart = cart.map(item =>
      item.productName === productName
        ? { ...item, quantity: quantity }  // Update the quantity
        : item
    );
    setCart(updatedCart);
  };

  // Remove an item from the cart
  const removeItem = (productName) => {
    const updatedCart = cart.filter(item => item.productName !== productName);  // Remove the item from the cart
    setCart(updatedCart);
  };

  return (
    <div>
      <Header />
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            productName={product.productName}
            productPrice={product.productPrice}
            imageSrc={product.imageSrc}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <ContactForm
        cartItems={cart}
        cartTotal={total}
      />
        <OrdersTable/>
    </div>
  );
};

export default App;
