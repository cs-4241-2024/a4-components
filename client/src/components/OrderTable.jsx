import { useEffect, useState } from 'react';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null); // Store the order to be edited
  const [showModal, setShowModal] = useState(false);

  const getLatestOrders = () => {
    fetch('/orders/my-orders', {
      credentials: 'include'
   })
     .then(response => response.json())
     .then((data) => {
       setOrders(data.orders);
       setIsLoading(false);
     })
     .catch((error) => {
       console.error('Error fetching orders:', error);
       setIsLoading(false);
     });
  }

  useEffect(() => {
    getLatestOrders();
  }, []);

// Function to handle the edit button click
const handleEditClick = (order) => {
  setEditOrder(order); // Set the selected order for editing
  setShowModal(true);  // Show the modal
};

// Function to handle the delete button click
const handleDeleteClick = (orderId) => {
  fetch(`/orders/delete/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
    .then((response) => {
      if (response.ok) {
        // Remove the deleted order from the state
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        console.error('Error deleting order');
      }
    })
    .catch((error) => {
      console.error('Error deleting order:', error);
    });
};

// Handle the form submission for editing an order
const handleEditSubmit = (event) => {
  event.preventDefault();

  const updatedOrder = {
    name: event.target['edit-name'].value,
    address: event.target['edit-address'].value,
  };

  fetch(`/orders/update/${editOrder._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updatedOrder),
  })
    .then((response) => response.json())
    .then((updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
      setShowModal(false); // Close the modal
    getLatestOrders();
      
    })
    .catch((error) => {
      console.error('Error updating order:', error);
    });
};

// Render loading state
if (isLoading) {
  return <div>Loading orders...</div>;
}

return (
  <div className="table-container">
    <table id="orders-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Order No.</th>
          <th>Order Cost</th>
          <th>Cash Total</th>
          <th>Item Total</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr>
            <td colSpan="8">No orders found.</td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{order.orderNumber}</td>
              <td>{order.totalPrice}</td>
              <td>{order.cashTotal}</td>
              <td>{order.itemTotal}</td>
              <td>
                <button
                  className="edit-order-btn"
                  onClick={() => handleEditClick(order)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="delete-order-btn"
                  onClick={() => handleDeleteClick(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    {/* Edit Order Modal */}
    {showModal && (
      <div id="editModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowModal(false)}>
            &times;
          </span>
          <h2>Edit Order</h2>
          <form id="editForm" onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="edit-name">Full Name:</label>
              <input
                type="text"
                id="edit-name"
                name="edit-name"
                defaultValue={editOrder.name}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-address">Delivery Address:</label>
              <textarea
                id="edit-address"
                name="edit-address"
                defaultValue={editOrder.address}
                required
              ></textarea>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default OrdersTable;