function GroceryListItem({
    item,
    key,
}: {
    item: {
        name: string;
        description: string;
        price: number;
        quantity: number;
        total: number;
    };
    key: number;
}) {
    return (
        <tr key={key} className="record">
            <td className="name">{item.name}</td>
            <td className="description">{item.description}</td>
            <td className="price">${item.price.toFixed(2)}</td>
            <td className="quantity">{item.quantity}</td>
            <td className="total">${item.total.toFixed(2)}</td>
            <td className="recordButton">
                <button className="block round">Delete</button>
            </td>
        </tr>
    );
}

export default function GroceryList() {
    const data = [
        {
            name: "apples",
            description: "red",
            price: 0.25,
            quantity: 2,
            total: 0.5,
        },
        {
            name: "bananas",
            description: "yellow",
            price: 0.25,
            quantity: 1,
            total: 0.25,
        },
        {
            name: "oranges",
            description: "orange",
            price: 0.25,
            quantity: 3,
            total: 0.75,
        },
    ];

    const sum = data.reduce((acc, item) => {
        return acc + item.total;
    }, 0);

    return (
        <div className="listDiv">
            <table className="block">
                <tr>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                {data.map((item, i) => (
                    <GroceryListItem key={i} item={item} />
                ))}
            </table>
            <h3 className="grandTotal">Grand Total: ${sum.toFixed(2)}</h3>
        </div>
    );
}
