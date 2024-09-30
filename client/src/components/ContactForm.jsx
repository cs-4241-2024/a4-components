import { useEffect, useState } from "react";

const ContactForm = ({ cartItems, cartTotal }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        instructions: "",
    });

    const [cardData, setCardData] = useState({ cardInfo: "" });
    const [orderNumber, setOrderNumber] = useState(1);
    const [cumulativeItemTotal, setCumulativeItemTotal] = useState(0);
    const [cumulativeCashTotal, setCumulativeCashTotal] = useState(0);

    const [errors, setErrors] = useState({});
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
    const [showConfirmForm, setShowConfirmForm] = useState(false);

    // Default values for tax and delivery fee
    const taxRate = 0.1; // 10% tax
    const deliveryFee = 5.00;
    const tax = (cartTotal * taxRate).toFixed(2);
    const totalPrice = (parseFloat(cartTotal) + parseFloat(tax) + deliveryFee).toFixed(2);
    const itemTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);  // Total number of items in current cart

    useEffect(() => {
        const storedOrderNumber = localStorage.getItem("orderNumber");
        const storedCumulativeItemTotal = localStorage.getItem("cumulativeItemTotal");
        const storedCumulativeCashTotal = localStorage.getItem("cumulativeCashTotal");
    
        setOrderNumber(storedOrderNumber ? parseInt(storedOrderNumber) : 1);
        setCumulativeItemTotal(storedCumulativeItemTotal ? parseInt(storedCumulativeItemTotal) : 0);
        setCumulativeCashTotal(storedCumulativeCashTotal ? parseFloat(storedCumulativeCashTotal) : 0);
      }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    };

    // Simple form validation
    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = "Full Name is required";
        if (!formData.phone) errors.phone = "Phone Number is required";
        else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone Number must be 10 digits";
        if (!formData.address) errors.address = "Delivery Address is required";
        return errors;
    };

     // Update cumulative totals in localStorage and state
  const updateCumulativeTotals = () => {
    const newOrderNumber = orderNumber + 1;
    const newCumulativeItemTotal = cumulativeItemTotal + itemTotal;
    const newCumulativeCashTotal = cumulativeCashTotal + parseFloat(totalPrice);

    // Update in localStorage
    localStorage.setItem("orderNumber", newOrderNumber);
    localStorage.setItem("cumulativeItemTotal", newCumulativeItemTotal);
    localStorage.setItem("cumulativeCashTotal", newCumulativeCashTotal);

    // Update state
    setOrderNumber(newOrderNumber);
    setCumulativeItemTotal(newCumulativeItemTotal);
    setCumulativeCashTotal(newCumulativeCashTotal);
  };


    // API function to add data to the server
    const addDataToServer = (json) => {
        const body = JSON.stringify(json);

        fetch('/orders/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Ensure JSON is sent
            },
            body,
            credentials: 'include', 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit the order');
                }
                return response.json();
            })
            .then(json => {
                setIsOrderSubmitted(true);  // Mark the order as submitted
                alert("Your order has been submitted successfully!");
                updateCumulativeTotals(); 
                resetForm();  // Reset form after submission
            })
            .catch(error => {
                console.error('Error submitting the order:', error);
                alert('There was an issue submitting your order. Please try again.');
            });
    };

    // Reset form data after successful submission
    const resetForm = () => {
        setFormData({ name: "", phone: "", address: "", instructions: "" });
        setCardData({ cardInfo: "" });
        setShowConfirmForm(false);  // Hide confirmation form
    };

    // Handle contact form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            // No validation errors, show the confirmation form
            setErrors({});
            setShowConfirmForm(true); // Show the confirm form after successful submission
        }
    };

    // Handle final confirmation submission
    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        if (!cardData.cardInfo) {
            alert("Please enter your card information");
            return;
        }
        const orderData = {
            orderNumber: orderNumber,  // Use current order number
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            instructions: formData.instructions,
            taxPrice: tax,
            totalPrice: totalPrice,
            itemTotal: cumulativeItemTotal + itemTotal,  // Add current items to cumulative total
            cashTotal: Number(cumulativeCashTotal) + parseFloat(totalPrice),
            action: "addToCart",
          };
      
        addDataToServer(orderData);  // Send the order data to the server
    };

    if (isOrderSubmitted) {
        alert("Your order has been submitted successfully!");
    }

    return (
        <div className="contact-form-container">
            {!showConfirmForm ? (
                <div>
                    <h2>Contact Information</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? "error" : ""}
                                required
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                className={errors.phone ? "error" : ""}
                                required
                            />
                            {errors.phone && <p className="error-text">{errors.phone}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Delivery Address:</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={errors.address ? "error" : ""}
                                required
                            ></textarea>
                            {errors.address && <p className="error-text">{errors.address}</p>}
                        </div>

                        <div className="form-group">
                            <div className="cart">
                                <h2>Shopping Cart</h2>
                                <ul id="cart-items">
                                    {cartItems.map((item, index) => (
                                        <li key={index}>
                                            {item.productName} - {item.quantity} x ${item.productPrice}
                                        </li>
                                    ))}
                                </ul>
                                <p id="cart-total">Total: ${cartTotal}</p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="instructions">Special Instructions:</label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit">Submit Order</button>
                    </form>
                </div>
            ) : (
                <div className="confirm-form">
                    <h2>Confirm Your Order</h2>
                    <form onSubmit={handleConfirmSubmit}>
                        <div className="form-group-1">
                            <label htmlFor="confirm-name">Full Name:</label>
                            <input type="text" id="confirm-name" name="confirm-name" value={formData.name} readOnly />
                        </div>
                        <div className="form-group-1">
                            <label htmlFor="confirm-phone">Phone Number:</label>
                            <input type="tel" id="confirm-phone" name="confirm-phone" value={formData.phone} readOnly />
                        </div>
                        <div className="form-group-1">
                            <label htmlFor="confirm-address">Delivery Address:</label>
                            <textarea id="confirm-address" name="confirm-address" value={formData.address} readOnly />
                        </div>
                        <div className="form-group-1">
                            <label htmlFor="confirm-instructions">Special Instructions:</label>
                            <textarea id="confirm-instructions" name="confirm-instructions" value={formData.instructions} readOnly />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card-info">Card Information</label>
                            <textarea
                                id="card-info"
                                name="cardInfo"
                                value={cardData.cardInfo}
                                onChange={handleCardChange}
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Price of Order:</label>
                            <div>${cartTotal}</div>
                        </div>
                        <div className="form-group">
                            <label>Tax:</label>
                            <div>${tax}</div>
                        </div>
                        <div className="form-group">
                            <label>Delivery Fee:</label>
                            <div>${deliveryFee.toFixed(2)}</div>
                        </div>
                        <div className="form-group">
                            <label>Total Price:</label>
                            <div>${totalPrice}</div>
                        </div>

                        <button type="submit">Confirm and Place Order</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
