export function Table() { // Table heading component
  return (
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Cost</th>
          <th>Checked</th>
          <th>Settings</th>
        </tr>
      </thead>
  );
}

export function Input() {
  return (
    <form>
      <input type="text" id="name" placeholder="Item name:" required />
      <input type="number" id="price" placeholder="Price:" min="0" required />
      <input type="number" id="quantity" placeholder="Quantity:" min="1" required />
      
      <p></p>
      <div id="root"></div>
    </form>
  )
}

