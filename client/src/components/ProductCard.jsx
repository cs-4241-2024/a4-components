const ProductCard = ({ productName, productPrice, imageSrc, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    const quantity = parseInt(e.target.quantity.value);
    onAddToCart(productName, productPrice, quantity);
  };

  return (
    <div className="image-container">
      <img src={imageSrc} alt={productName} />
      <p><strong>{productName}</strong><br />${productPrice}</p>
      <form onSubmit={handleAddToCart} className="add-to-cart-form">
        <input type="hidden" name="product-name" value={productName} />
        <input type="hidden" name="product-price" value={productPrice} />
        <div className="quantity-container">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" name="quantity" defaultValue="1" min="1" max="9" />
        </div>
        <button type="submit">Add to Cart</button>
      </form>
    </div>
  );
};

export default ProductCard;
