import { getCookie } from "../utils";

export default function AddGroceryItem() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = document.getElementById("itemName")!.value;
        const price = document.getElementById("itemPrice")!.value;
        const quantity = document.getElementById("itemQuantity")!.value;
        const description = document.getElementById("itemDescription")!.value;

        const body = JSON.stringify({
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description,
        });

        const accessToken = getCookie("accessToken");

        const response = await fetch("/data", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log(await response.text());
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
            <button type="submit" id="newItemSubmit" className="block accent round" onClick={handleSubmit}>
                Add Item
            </button>
        </div>
    );
}
