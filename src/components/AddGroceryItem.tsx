export default function AddGroceryItem() {
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
            <button id="newItemSubmit" className="block accent round">
                Add Item
            </button>
        </div>
    );
}
