import { Dispatch, SetStateAction } from "react";
import { Item } from "../types";
import { getCookie } from "../utils";

function GroceryListItem({
    item,
    i,
    onDelete,
}: {
    item: Item;
    i: number;
    onDelete: () => void;
}) {
    const handleDelete = async () => {
        const confirmation = confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmation) {
            return;
        }

        const body = JSON.stringify({
            index: i,
        });
        const accessToken = getCookie("accessToken");
        await fetch("/data", {
            method: "DELETE",
            body,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        onDelete();
    };

    return (
        <tr key={i} className="record">
            <td className="name">{item.name}</td>
            <td className="description">{item.description}</td>
            <td className="price">${item.price.toFixed(2)}</td>
            <td className="quantity">{item.quantity}</td>
            <td className="total">${item.total.toFixed(2)}</td>
            <td className="recordButton">
                <button className="block round" onClick={handleDelete}>
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default function GroceryList({
    data,
    loading,
    onUpdate,
}: {
    data: Item[];
    loading: boolean;
    onUpdate: Dispatch<SetStateAction<boolean>>;
}) {
    if (loading || !data) {
        return <div>Loading...</div>;
    }

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
                    <GroceryListItem
                        key={i}
                        i={i}
                        item={item}
                        onDelete={() => onUpdate(true)}
                    />
                ))}
            </table>
            <h3 className="grandTotal">Grand Total: ${sum.toFixed(2)}</h3>
        </div>
    );
}
