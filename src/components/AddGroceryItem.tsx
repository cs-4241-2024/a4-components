import { Dispatch, SetStateAction } from "react";
import { getCookie, validateInput } from "../utils";

export default function AddGroceryItem({
    onUpdate,
}: {
    onUpdate: Dispatch<SetStateAction<boolean>>;
}) {
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const name = (document.getElementById("itemName") as HTMLInputElement)!
            .value;
        const price = (document.getElementById(
            "itemPrice"
        ) as HTMLInputElement)!.value;
        const quantity = (document.getElementById(
            "itemQuantity"
        ) as HTMLInputElement)!.value;
        const description = (document.getElementById(
            "itemDescription"
        ) as HTMLInputElement)!.value;

        const body = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description,
        };

        // Validating input
        if (!validateInput(body)) {
            return;
        }

        const accessToken = getCookie("accessToken");

        await fetch("/data", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        onUpdate(true);
    };

    return (
        <div className="formDiv">
            <form className="formItem">
                <input
                    className="block"
                    type="text"
                    id="itemName"
                    placeholder="item name"
                    required
                ></input>
                <input
                    className="block"
                    type="number"
                    id="itemPrice"
                    step="0.25"
                    placeholder="price"
                    required
                ></input>
                <input
                    className="block"
                    type="number"
                    id="itemQuantity"
                    placeholder="#"
                    required
                ></input>
            </form>
            <textarea
                className="block"
                id="itemDescription"
                placeholder="item description"
            ></textarea>
            <button
                type="submit"
                id="newItemSubmit"
                className="block accent round"
                onClick={handleSubmit}
            >
                Add Item
            </button>
        </div>
    );
}
