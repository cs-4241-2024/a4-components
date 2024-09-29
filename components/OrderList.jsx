import React from 'react';

const foodOptions = {
    10: "Burger",
    5: "Fries",
    3: "Milkshake",
};

const OrderList = ({ orders, onEditOrder, onDeleteOrder }) => {
    const handleEdit = (index) => {
        const name = prompt('Edit Name:', orders[index].name);
        const foodPrice = parseInt(prompt('Edit Food Price (10 for Burger, 5 for Fries, 3 for Milkshake):', orders[index].foodPrice));
        const quantity = parseInt(prompt('Edit Quantity:', orders[index].quantity));

        if (name && foodPrice && quantity) {
            const updatedOrder = {
                name,
                foodName: foodOptions[foodPrice],
                foodPrice,
                quantity,
            };

            onEditOrder(updatedOrder, index);
        }
    };

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            onDeleteOrder(index);
        }
    };

    return (
        <ul>
            {orders.map((item, index) => (
                <li key={index}>
                    {item.name} ordered {item.quantity} x {item.foodName} ($
                    {item.foodPrice} each)
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default OrderList;