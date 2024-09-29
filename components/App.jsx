import React, { useState, useEffect } from 'react';
import OrderForm from './OrderForm.jsx';
import OrderList from './OrderList.jsx';

const App = () => {
    const [orderedItemsArray, setOrderedItemsArray] = useState([]);
    const [cumulativeTotalPrice, setCumulativeTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch initial orders on load
        const fetchInitialOrders = async () => {
            try {
                const response = await fetch('/orders', {
                    method: 'GET'
                })
                if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);

                const data = await response.json();
                setOrderedItemsArray(data.appdata);


                const totalPrice = data.appdata.reduce((total, item) => total + item.foodPrice * item.quantity, 0);
                setCumulativeTotalPrice(totalPrice);
            } catch (error) {
                console.error('Error fetching initial orders:', error);
            }
        };

        fetchInitialOrders();
    }, []);

    const handleAddOrder = async (newOrder) => {
        try {
            const response = await fetch('/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder),
            });
            if (!response.ok) throw new Error('Error adding order');

            const data = await response.json();
            setOrderedItemsArray(data.appdata);
            const totalPrice = data.appdata.reduce((total, item) => total + item.foodPrice * item.quantity, 0);
            setCumulativeTotalPrice(totalPrice);
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    const handleEditOrder = async (updatedOrder, index) => {
        try {
            const response = await fetch(`/orders/${index}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOrder),
            });
            if (!response.ok) throw new Error('Error updating order');

            const data = await response.json();
            setOrderedItemsArray(data.appdata);
            const totalPrice = data.appdata.reduce((total, item) => total + item.foodPrice * item.quantity, 0);
            setCumulativeTotalPrice(totalPrice);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleDeleteOrder = async (index) => {
        try {
            const response = await fetch(`/orders/${index}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error deleting order');

            const data = await response.json();
            setOrderedItemsArray(data.appdata);
            const totalPrice = data.appdata.reduce((total, item) => total + item.foodPrice * item.quantity, 0);
            setCumulativeTotalPrice(totalPrice);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div className="App">
            <h1>Restaurant Service</h1>
            <OrderForm onAddOrder={handleAddOrder} cumulativeTotalPrice={cumulativeTotalPrice} />
            <h3>Cumulative Total Price: ${cumulativeTotalPrice}</h3>
            <OrderList
                orders={orderedItemsArray}
                onEditOrder={handleEditOrder}
                onDeleteOrder={handleDeleteOrder}
            />
        </div>
    );
};

export default App;