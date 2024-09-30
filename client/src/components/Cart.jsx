import { useState, useEffect } from "react";

const Cart = ({ cart, updateCart, removeItem, submitOrder }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Recalculate the total price every time the cart changes
    let total = 0;
    cart.forEach((item) => {
      total += item.productPrice * item.quantity;
    });
    setTotalPrice(total.toFixed(2));
  }, [cart]);

  const handleQuantityChange = (productName, quantity) => {
    // Call the updateCart function to modify the quantity of an item
    if (quantity > 0) {
      updateCart(productName, quantity);
    }
  };

  const handleRemoveItem = (productName) => {
    // Call removeItem function to remove an item from the cart
    removeItem(productName);
  };

  const handleCheckout = () => {
    // Call submitOrder function to proceed to the checkout page
    submitOrder();
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-info">
                  <span>{item.productName}</span>
                  <span>${item.productPrice.toFixed(2)}</span>
                </div>
                <div className="item-actions">
                  <label>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max="9"
                      onChange={(e) =>
                        handleQuantityChange(item.name, parseInt(e.target.value))
                      }
                    />
                  </label>
                  <button onClick={() => handleRemoveItem(item.name)}>
                    Remove
                  </button>
                </div>
                {/* <div className="item-total">
                  Item Total: ${(item.price * item.quantity).toFixed(2)}
                </div> */}
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${totalPrice}</h3>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
