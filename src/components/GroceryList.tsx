import { Dispatch, SetStateAction } from "react";
import { Item } from "../types";
import { getCookie, validateInput } from "../utils";

function GroceryListItem({
    item,
    i,
    onUpdate,
}: {
    item: Item;
    i: number;
    onUpdate: () => void;
}) {
    const handleEdit = async function (this: HTMLElement) {
        const row = document.getElementById(`record-${i}`) as HTMLElement;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const body: any = {
            index: Number(row.id.split("-")[1]),
        };

        for (const child of row.children) {
            const content = (child as HTMLElement).innerText;

            if (Number(content)) {
                body[child.classList[0] as keyof Item] = Number(content);
            } else if (content !== "recordButton") {
                body[child.classList[0] as keyof Item] = content;
            }
        }

        console.log(body);

        // Validating input
        if (!validateInput(body)) {
            return;
        }

        await fetch("/data", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("accessToken")}`,
            },
        });

        onUpdate();
    };

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

        onUpdate();
    };

    return (
        <tr key={i} className="record" id={`record-${i}`}>
            <td contentEditable className="name" onBlur={handleEdit}>
                {item.name}
            </td>
            <td contentEditable className="description" onBlur={handleEdit}>
                {item.description}
            </td>
            <td contentEditable className="price" onBlur={handleEdit}>
                {item.price.toFixed(2)}
            </td>
            <td contentEditable className="quantity" onBlur={handleEdit}>
                {item.quantity}
            </td>
            <td contentEditable className="total" onBlur={handleEdit}>
                ${item.total.toFixed(2)}
            </td>
            <td contentEditable className="recordButton">
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
                        onUpdate={() => onUpdate(true)}
                    />
                ))}
            </table>
            <h3 className="grandTotal">Grand Total: ${sum.toFixed(2)}</h3>
        </div>
    );
}
