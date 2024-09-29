import React, { useState } from 'react';

const foodOptions = {
    10: 'Burger',
    5: 'Fries',
    3: 'Milkshake',
};

const OrderForm = ({ onAddOrder }) => {
    const [name, setName] = useState('');
    const [food, setFood] = useState(10);
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !food || !quantity) {
            alert('Please fill out all fields before submitting the form.');
            return;
        }

        const newOrder = {
            name,
            food, // Sending the food price directly
            quantity,
        };

        onAddOrder(newOrder);

        // Clear form after submission
        setName('');
        setFood(10);
        setQuantity(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>

            <label>
                Food:
                <select value={food} onChange={(e) => setFood(parseInt(e.target.value))}>
                    <option value="10">Burger ($10)</option>
                    <option value="5">Fries ($5)</option>
                    <option value="3">Milkshake ($3)</option>
                </select>
            </label>

            <label>
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="1"
                    max="5"
                    required
                />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
};

export default OrderForm;